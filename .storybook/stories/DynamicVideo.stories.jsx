import DynamicVideo from "components/DynamicVideo"

export default {
  title: "Storyblok/Dynamic Video",
  component: DynamicVideo,
  parameters: {
    docs: {
      description: {
        component: "Component which dynamically renders video based on which kind of video is passed in.",
      },
    },
  },
  argTypes: {
    component: {
      description: "Determines which type of video is displayed",
      type: { required: true },
      control: "select",
      options: ["yt_embed", "video_embed"],
    },
    id: {
      description: "Youtube video id",
    },
    video_asset: {
      description: "Video embed asset",
    },
    thumbnail: {
      description: "Thumbnail to be displayed before playing video asset",
    },
  },
}

const Template = (args) => {
  return (
    <div className="w-full h-full">
      <DynamicVideo {...args} />
    </div>
  )
}

export const YoutubeVideo = Template.bind({})
YoutubeVideo.args = {
  component: "yt_embed",
  id: "dQw4w9WgXcQ",
}

export const VideoEmbed = Template.bind({})
VideoEmbed.args = {
  component: "video_embed",
  video_asset: {
    filename: "https://a.storyblok.com/f/179785/x/5898d1fcf3/montgomery-realty-061820.mp4",
  },
  thumbnail: {
    filename: "https://a.storyblok.com/f/179785/729x512/2d80512879/drone-guided-tour-video.png",
  },
}
