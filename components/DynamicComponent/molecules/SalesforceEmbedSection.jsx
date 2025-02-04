export default function SalesforceFormEmbedSection({ blok }) {
  return (
    <section className="px-5 py-8 lg:py-16">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-[900px] bg-secondary-2 p-8">
          <h3 className="text-primary-1">We Can&apos;git t Wait to Meet You!</h3>
          <p className="py-4">Please fill out this form and we will reach out to schedule your meeting.</p>
          <form
            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D5Y000002GBUg"
            method="POST"
            className="salesforce-form bg-secondary-2 py-2 font-primary font-bold text-gray-charcoal"
          >
            <input type="hidden" name="oid" value="00D5Y000002GBUg" />
            <input type="hidden" name="retURL" value="https://www.fullertonfp.com/free-retirement-toolkit" />
            {/* <input type="hidden" name="debug" value="1" /> */}
            {/* <input type="hidden" name="debugEmail" value="blanec@fullertonfp.com" /> */}

            <div className="flex flex-col gap-4 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col">
                  <label for="first_name">First Name</label>
                  <input id="first_name" maxLength="40" name="first_name" size="40" type="text" className="px-4" />
                </div>

                <div className="flex flex-col">
                  <label for="last_name">Last Name</label>
                  <input id="last_name" maxLength="80" name="last_name" size="20" type="text" className="px-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col">
                  <label for="phone">Phone Number</label>
                  <input id="phone" maxLength="40" name="phone" size="20" type="text" className="px-4" />
                </div>
                <div className="flex flex-col">
                  <label for="email">Email</label>
                  <input id="email" maxLength="80" name="email" size="20" type="text" className="px-4" />
                </div>
              </div>
              <div className="py-4">
                <input
                  type="submit"
                  id="submit"
                  name="submit"
                  className="cursor-pointer bg-tertiary-1 px-8 font-primary font-light uppercase text-primary-1 hover:bg-secondary-1 hover:text-white"
                ></input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
