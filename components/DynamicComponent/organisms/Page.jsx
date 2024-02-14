import DynamicComponent from ".."

export default function Page({ blok }) {
  return blok?.body ? (
    <main className="page-content" data-pagefind-body>
      {blok.body.map((blok) => (
        <DynamicComponent blok={blok} key={blok._uid} />
      ))}
    </main>
  ) : null
}
