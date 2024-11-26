import cn from "classnames"
import richText from "utilities/richText"
import Image from "components/Image"
import Meta from "components/Meta"
import VideoSection from "components/DynamicComponent/molecules/VideoSection"

export default function WebinarPage({ webinar }) {
  const hasImage = Boolean(webinar?.image?.filename)

  return (
    <>
      <Meta
        info={{
          title: webinar?.twentysixty_seo?.title,
          og_title: webinar?.twentysixty_seo?.title,
          twitter_title: webinar?.twentysixty_seo?.title,
          description: webinar?.twentysixty_seo?.description,
          og_description: webinar?.twentysixty_seo?.description,
          twitter_description: webinar?.twentysixty_seo?.description,
          og_image: webinar?.image?.filename,
          twitter_image: webinar?.image?.filename,
        }}
      />
      <section
        className={cn("bg-primary-1", {
          "mt-24 pb-12 pl-6 sm:pb-16 lg:mt-16 lg:pb-0 lg:pl-0": hasImage,
          "px-6 py-8 lg:py-12": !hasImage,
        })}
      >
        <div
          className={cn({
            "mx-auto flex max-w-screen-2xl flex-col-reverse lg:flex-row lg:gap-12": hasImage,
            "mx-auto max-w-screen-xl": !hasImage,
          })}
        >
          <div
            className={cn({
              "w-full max-w-md justify-self-end pr-6 lg:ml-6 lg:self-center lg:py-8 lg:pr-0 xl:ml-[72px] xl:mr-14 2xl:ml-[94px] 2xl:mr-12 2xl:pl-8":
                hasImage,
            })}
          >
            <h1 className="pb-4 text-white">{webinar?.title}</h1>
          </div>

          <div className="relative -top-16 right-0 -mb-8 mr-3 h-full w-full self-end justify-self-end border-2 border-secondary-1 lg:-top-10 lg:-mb-0">
            <Image
              loader={null}
              src={webinar?.image?.filename ? webinar?.image?.filename : "/assets/blog-placeholder.svg"}
              alt=""
              width={896}
              height={585}
              className="relative -right-3.5 -top-3.5 aspect-[896/505] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {webinar?.content?.content?.length > 0 ? (
        <section className="px-6 py-12 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="pb-8 text-primary-1 lg:text-center">Webinar Description</h2>
            <div>{richText(webinar?.content)}</div>
          </div>
        </section>
      ) : null}
      <VideoSection blok={{ video: [webinar.video[0]] }} />
    </>
  )
}
