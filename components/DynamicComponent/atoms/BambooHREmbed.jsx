import { useEffect, useRef } from "react"

export default function BambooHREmbed({ blok: { subdomain = "fullertonfinancial", heading } }) {
  const bambooHRRef = useRef(null)

  useEffect(() => {
    if (!bambooHRRef.current) return

    async function getBambooHR() {
      const embedRequest = await fetch(`https://${subdomain}.bamboohr.com/jobs/embed2.php?version=1.0.0`)
      const embedContents = await embedRequest.text()

      bambooHRRef.current.innerHTML = embedContents
    }

    getBambooHR()
  }, [subdomain])

  return (
    <section className="py-12 lg:py-24 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-primary-1 text-center mb-12">{heading}</h2>
        <style>
          {`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600&display=swap');

  .BambooHR-ATS-board {
    text-align: left;
    font-family: 'Lato', sans-serif;
  }

  .BambooHR-ATS-board h2 {
    font-size: 19px;
    color: #555;
  }

  .BambooHR-ATS-board ul {
    font-size: 12px;
  }

  .BambooHR-ATS-board ul > ul:last-of-type {
    margin-bottom: 0px;
  }

  .BambooHR-ATS-board li {
    color: #686868;
  }

  .BambooHR-ATS-board a {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.9em;
  }

  .BambooHR-ATS-board .BambooHR-ATS-blankState {
    color: #adadad;
    font-size: 15px;
  }

  .BambooHR-ATS-board .BambooHR-ATS-blankState strong {
    font-size: 16px;
    font-weight: 600;
  }

  #BambooHR-Footer {
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    color: #999;
    text-align: right;
    margin: 9px 9px 0px 0px;
  }

  #BambooHR-Footer img { display: inline; }`}
        </style>

        <div ref={bambooHRRef}></div>
        <footer
          id="BambooHR-Footer"
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "12px",
            color: "rgb(153,153,153",
            textAlign: "right",
            margin: "9px 9px 0px 0px;",
          }}
        >
          Powered by
          <a href="http://www.bamboohr.com" target="_blank" rel="external">
            <img
              className="my-0 inline-block"
              src="https://resources.bamboohr.com/images/footer-logo.png"
              alt="BambooHR - HR software"
            />
          </a>
        </footer>
      </div>
    </section>
  )
}
