import { useState } from "react"
import NextImage from "next/image"
import storyblokImageLoader from "utilities/storyblokImageLoader"
import cn from "classnames"

export default function Image(props) {
  const [isLoading, setLoading] = useState(true)

  return props?.src?.length ? (
    <NextImage
      loader={storyblokImageLoader}
      className={cn(
        props.className,
        "duration-700 ease-in-out",
        isLoading ? "scale-100 blur-md grayscale" : "scale-100 blur-0 grayscale-0",
      )}
      onLoadingComplete={() => setLoading(false)}
      {...props}
    />
  ) : null
}
