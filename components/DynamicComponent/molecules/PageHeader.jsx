import Image from "components/Image"

export default function PageHeader({ blok }) {
  return (
    <section className="bg-primary-1">
      <div>
        <div>
          <h1 className="text-white">{blok?.heading}</h1>
        </div>
        {/* <Image src={blok?.image?.filename} alt={blok?.image?.alt} /> */}
      </div>
    </section>
  )
}
