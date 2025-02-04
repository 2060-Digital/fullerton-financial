export default function SalesforceFormEmbedSection({ blok }) {
  return (
    <section className="px-5 py-8 lg:py-16">
      <div className="mx-auto max-w-screen-xl">
        <form
          action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D5Y000002GBUg"
          method="POST"
          className="salesforce-form"
        >
          <input type="hidden" name="oid" value="00D5Y000002GBUg" />
          <input type="hidden" name="retURL" value="https://www.fullertonfp.com/free-retirement-toolkit" />
          {/* <input type="hidden" name="debug" value="1" /> */}
          {/* <input type="hidden" name="debugEmail" value="blanec@fullertonfp.com" /> */}

          <label for="first_name">First Name</label>
          <input id="first_name" maxLength="40" name="first_name" size="20" type="text" />
          <br />

          <label for="last_name">Last Name</label>
          <input id="last_name" maxLength="80" name="last_name" size="20" type="text" />
          <br />

          <label for="phone">Phone</label>
          <input id="phone" maxLength="40" name="phone" size="20" type="text" />
          <br />

          <label for="email">Email</label>
          <input id="email" maxLength="80" name="email" size="20" type="text" />
          <br />

          <input type="submit" name="submit"></input>
        </form>
      </div>
    </section>
  )
}
