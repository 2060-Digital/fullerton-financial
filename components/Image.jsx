import { useState } from "react"
import NextImage from "next/image"
import storyblokImageLoader from "utilities/storyblokImageLoader"
import cn from "classnames"

export default function Image(props) {
  const [isLoading, setLoading] = useState(true)

  return (
    <NextImage
      loader={storyblokImageLoader}
      className={cn(
        props.className,
        "duration-700 ease-in-out",
        isLoading ? "grayscale blur-md scale-100" : "grayscale-0 blur-0 scale-100"
      )}
      onLoadingComplete={() => setLoading(false)}
      {...props}
    />
  )
}
