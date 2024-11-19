import { useState, useRef } from "react"
import PlayButton from "public/assets/play.svg"
import cn from "classnames"

export default function DynamicVideo({ component, ...videoFields }) {
  switch (component) {
    case "video_embed":
      return <VideoEmbed {...videoFields} />
    case "yt_embed":
      return <YTEmbed {...videoFields} />
    case "vimeo_embed":
      return <VimeoEmbed {...videoFields} />
    default:
      return "Invalid video type"
  }
}

function VideoEmbed({ video_asset, thumbnail }) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef(null)

  let type = `video/${video_asset.filename.match(/.(mov|mp4)/gi)[0]}`.replace(".", "")
  switch (type) {
    case "video/mov":
      type = "video/mp4"
      break
    case "video/mp4":
      type = "video/mp4"
      break
    default:
      type = "invalid"
      break
  }

  return (
    <div className="relative mx-auto">
      <button
        onClick={() => {
          setVideoPlaying(!videoPlaying)
          videoPlaying === true ? videoRef.current.pause() : videoRef.current.play()
        }}
        className={cn("absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2", {
          hidden: videoPlaying,
        })}
        title="Play video"
      >
        <PlayButton className="play-video aspect-square w-10" />
      </button>
      <video
        ref={videoRef}
        poster={thumbnail.filename}
        src={video_asset.filename}
        className="video-embed aspect-video w-full"
        type={type}
        controls
        onPlay={() => setVideoPlaying(true)}
        onPause={() => setVideoPlaying(false)}
      />
    </div>
  )
}

function YTEmbed({ id }) {
  const [videoPlay, setVideoPlay] = useState(false)

  const YTVideoStyles = "aspect-video cursor-pointer w-full"

  return !videoPlay ? (
    <>
      <div className="youtube-thumbnail relative z-10 cursor-pointer" onClick={() => setVideoPlay(true)}>
        <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt="YouTube Video" className={YTVideoStyles} />
        <PlayButton
          className="play-video absolute left-1/2 top-1/2 aspect-square w-20 -translate-x-1/2 -translate-y-1/2 scale-100 cursor-pointer"
          title="Play video"
        />
      </div>
      <button className="sr-only" onClick={() => setVideoPlay(true)}>
        Load YouTube Video
      </button>
    </>
  ) : (
    <iframe
      className={cn(YTVideoStyles, "youtube-iframe")}
      src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
      allowFullScreen
      autoPlay
    />
  )
}

function VimeoEmbed({ src }) {
  const [videoPlay, setVideoPlay] = useState(false)

  return !videoPlay ? (
    <>
      <div className="vimeo-thumbnail relative z-10 cursor-pointer" onClick={() => setVideoPlay(true)}>
        <PlayButton
          className="play-video absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 cursor-pointer sm:scale-100"
          title="Play video"
        />
      </div>
      <button className="sr-only" onClick={() => setVideoPlay(true)}>
        Load Vimeo Video
      </button>
    </>
  ) : (
    <iframe
      className={cn(IframeVideoStyles, "vimeo-iframe")}
      src={`${getStoryblokLink(src)}&autoplay=1`}
      allowFullScreen
      allow="autoplay"
    />
  )
}
