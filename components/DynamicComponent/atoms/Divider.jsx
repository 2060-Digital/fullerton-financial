export default function Divider({ blok, a11yHidden = false }) {
  return (
    <div className="content-divider" aria-hidden={a11yHidden}>
      <div className="max-w-screen-xl mx-auto relative bg-primary-1">
        <hr className="block w-full mx-auto border-t-0 h-0.5 divider" />
      </div>
    </div>
  )
}
