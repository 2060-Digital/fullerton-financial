import Image from "next/image"
import CallToAction from "components/CallToAction"
import getSbImageDimensions from "utilities/getSbImageDimensions"
import storyblokImageLoader from "utilities/storyblokImageLoader"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function TeamMemberCard({ image, first_name, last_name, job_title, email, vip, slug }) {
  return (
    <div className={cn("bg-gray-light h-full", { "bg-secondary-2": vip })}>
      <div className="w-full relative">
        <div className="w-full h-full absolute border-2 border-secondary-1 top-5 right-5 z-10"></div>
        <Image
          loader={image.filename && image.filename !== "" ? storyblokImageLoader : undefined}
          src={image.filename && image.filename !== "" ? image.filename : "/assets/placeholder.png"}
          alt={image.alt ?? ""}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          width={getSbImageDimensions("width", image.filename)}
          height={getSbImageDimensions("height", image.filename)}
          className="w-full aspect-square object-cover min-h-[170px] relative z-20"
          sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
        />
      </div>
      <div className="px-7 py-10">
        <h3 className="text-primary-1 pb-2">
          {first_name} {last_name}
        </h3>
        <div className={cn(" leading-7", { "text-primary-1": vip })}>{job_title}</div>
        <CallToAction href={getStoryblokLink(email)} style="email-blue" target="_blank">
          {email?.url}
        </CallToAction>
      </div>
    </div>
  )
}
