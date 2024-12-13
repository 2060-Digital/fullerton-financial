export default function InlineTable({ blok }) {
  return (
    <>
      <table className="not-prose">
        <thead>
          <tr className="">
            {blok?.rates?.thead?.map((th) => (
              <th className="bg-primary-1 p-4 text-white" key={th._uid}>
                {th.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blok.rates.tbody.map((row, k) => (
            <tr key={k}>
              {row.body.map((td, k) => (
                <td className="p-2" key={k}>
                  {td.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
