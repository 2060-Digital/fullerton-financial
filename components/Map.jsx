import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import useHasIntersected from "utilities/useHasIntersected"

export default function Map({
  // default center is Roosevelt Arizona
  lng: initialLng = -111.134153997,
  lat: initialLat = 33.6672587976,
  initialZoom = 6,
  locations = [],
  scrollToZoom = true,
  flyTo,
}) {
  const router = useRouter()

  const map = useRef(null)

  const [lng] = useState(initialLng)
  const [lat] = useState(initialLat)
  const [markers, setMarkers] = useState([])

  const currentLocation = locations.find(({ name }) => name === flyTo)

  const { ref: mapContainer, isIntersecting } = useHasIntersected()

  // initialize map (warning: fair amount of imperative code below)
  useEffect(() => {
    if (map.current) return

    async function loadMap() {
      const maplibregl = (await import("maplibre-gl")).default
      const layers = (await import("components/mapLayersStyles")).default

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        center: [lng, lat],
        minPitch: 0,
        minZoom: 6,
        maxZoom: 15,
        pitch: 10,
        bearing: 0,
        style: {
          version: 8,
          glyphs: "/gis/glyphs/{fontstack}/{range}.pbf",
          sources: {
            protomaps: {
              type: "vector",
              tiles: ["https://maps.2060.services/basemapsz15/{z}/{x}/{y}.mvt"],
              attribution: `Fullerton Financial Planning © <a href="https://openstreetmap.org">OpenStreetMap Contributors</a>`,
            },
          },
          layers,
        },
      })

      // markers/locations & popups
      const markers = locations.map(({ latitude, longitude, name, address, slug, directionsLink }) => {
        const mapPin = document.createElement("div")
        mapPin.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" fill="none" class="map-pin"><circle cx="13" cy="13" r="13" fill="#036"/><path fill="#036" d="M13.43 30.5a.5.5 0 0 1-.86 0L6.4 19.81a.5.5 0 0 1 .43-.75h12.34a.5.5 0 0 1 .43.75L13.43 30.5Z"/><path fill="#EC871B" d="M13 1.63a11.34 11.34 0 0 0-11.38 11.3c0 3.23 1.37 6.14 3.55 8.2a15.37 15.37 0 0 1 4.46-1.49A18.57 18.57 0 0 1 11 14.72c.06-.14.03-.24-.1-.29a1.09 1.09 0 0 0-.67-.04l-.2.05c-.05.02-.1.03-.12.02-.02 0-.02-.03 0-.08.02-.14.2-.44.37-.52.17-.07.44-.14.8-.2.18-.05.31-.08.4-.12a.75.75 0 0 0 .27-.32 32.72 32.72 0 0 1 1.9-2.73c.16-.18.16-.26.02-.25-.14.01-.32.06-.54.13a.96.96 0 0 1-.24.07c-.05 0-.1.01-.15-.12-.02-.04 0-.11.03-.15a.24.24 0 0 1 .15-.08c.4-.15.72-.37 1.1-.63l.9-.63c.1-.06.26-.1.34-.1.43.01.55.28.6.34a.3.3 0 0 1 .06.23c0 .1-.06.2-.15.28l-.53.52a22.27 22.27 0 0 0-1.76 2.04c-.31.41-.58.84-.8 1.27-.06.12-.08.2-.06.22.02.03.12.05.3.08.37.05.8.08 1.29.1a58.25 58.25 0 0 0 3.64 0c.24 0 .36.03.33.07-.05.09-.18.1-.41.15-.2.04-.47.1-1 .17-.46.06-.97.09-1.5.1a369.47 369.47 0 0 0-2.76.04c-.18 0-.3.03-.38.09a.58.58 0 0 0-.2.3l-.5 1.11a15.54 15.54 0 0 0-.88 2.66c-.07.37-.1.7-.09 1.01.9-.12 1.82-.18 2.78-.18 2.98 0 5.7.62 7.76 1.64a11.23 11.23 0 0 0 3.38-8.03c0-6.25-5.1-11.31-11.38-11.31Zm8.34 7.52a1.5 1.5 0 0 1-.7.53 2.9 2.9 0 0 1-1.7.04 7.53 7.53 0 0 1-1.55-.57c-.25-.12-.48-.26-.7-.38l-.67-.37-1.35-.72c-.45-.24-.9-.46-1.36-.66a12.1 12.1 0 0 0-2.74-.96 6.02 6.02 0 0 0-2.04-.1l-.32.06c-.1.03-.18.04-.27.08a1.8 1.8 0 0 0-.86.7 2.6 2.6 0 0 0-.44 1.13c-.1.82.26 1.66 1.05 2.13.39.25.85.4 1.34.51.49.1 1 .15 1.52.17l.01.08a7.3 7.3 0 0 1-1.55.03 4.24 4.24 0 0 1-1.51-.4 2.7 2.7 0 0 1-1.15-1.04 2.73 2.73 0 0 1-.36-1.52 3.1 3.1 0 0 1 .47-1.48c.28-.45.69-.82 1.18-1.03 1-.37 2.08-.34 3.1-.13 1.02.21 2 .61 2.92 1.07.93.45 1.83.98 2.7 1.52.44.27.87.56 1.32.82.44.26.9.5 1.39.65.48.15 1 .23 1.5.1.24-.06.46-.2.62-.38a1 1 0 0 0 .19-.32.53.53 0 0 0 .02-.35l.07-.03c.07.14.07.28.04.43a1.2 1.2 0 0 1-.17.4Z"/></svg>'

        const popupBody = document.createElement("div")
        popupBody.innerHTML = `
          <h5 class="location-title text-m1 lg:text-m2 pb-2 lg:pb-4 text-primary-1">${name}</h5>
          <address class="text-s2 not-italic pb-2 lg:pb-4">${address.localized_address_display}</address>
          <a href="${directionsLink}" target="_blank" class="uppercase transition-all duration-200 text-primary-1 font-primary border-b-2 border-b-tertiary-1 hover:border-b-secondary-1">Get Directions</a>
        <button class="bg-primary-1 absolute bottom-0 right-0 p-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" fill="none"><path fill="white" d="M15.27 4.35a.5.5 0 0 0 0-.7L12.09.46a.5.5 0 1 0-.71.71L14.2 4l-2.83 2.83a.5.5 0 1 0 .7.7l3.19-3.18ZM.42 4.5h14.5v-1H.41v1Z"/></svg></button>`

        popupBody.querySelector("button").addEventListener("click", () => router.push(slug))

        const popup = new maplibregl.Popup({
          offset: {
            bottom: [0, -34],
          },
          closeOnMove: true,
          closeButton: false,
          focusAfterOpen: false,
          maxWidth: "280px",
          anchor: "bottom",
        }).setDOMContent(popupBody)

        const marker = new maplibregl.Marker({
          element: mapPin,
          anchor: "bottom",
        })
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map.current)

        mapPin.addEventListener("click", () => {
          map.current.flyTo({ center: [longitude, latitude + 0.0012], zoom: 15, speed: 1.7 })
          map.current.once("moveend", () => marker.togglePopup())
        })

        return marker
      })
      // toggled after location traversal below
      setMarkers(markers)

      // controls
      map.current.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-left")

      map.current.on("load", () => {
        map.current.flyTo({ center: [longitude, latitude], pitch: 45, zoom: initialZoom, bearing: 0, duration: 1000 })
        if (mapContainer.current) {
          mapContainer.current.classList.add("loaded")
        }
      })

      if (!scrollToZoom) {
        map.current.scrollZoom.disable()
      }
    }

    if (isIntersecting) {
      loadMap()
    }
  }, [lat, isIntersecting, lng, initialZoom, mapContainer, locations, flyTo, router, scrollToZoom])

  useEffect(() => {
    if (currentLocation?.coords) {
      const marker = markers.find((marker) => {
        const markerCoords = Object.values(marker.getLngLat()).toString()
        const currentCoords = currentLocation.coords.map((v) => +v).toString()

        return markerCoords === currentCoords
      })

      map.current.flyTo({ center: currentLocation.coords, zoom: 15, speed: 1.5 })
      map.current.once("moveend", () => marker?.togglePopup())
    }
  }, [currentLocation, markers, flyTo])

  return <div ref={mapContainer} className="absolute w-full h-full inset-0 object-cover" />
}
