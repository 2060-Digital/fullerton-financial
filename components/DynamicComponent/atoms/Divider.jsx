export default function Divider({ blok, a11yHidden = false }) {
  return (
    <div className="content-divider" aria-hidden={a11yHidden}>
      <div className="relative mx-auto max-w-screen-xl bg-secondary-1">
        <hr className="divider mx-auto block h-0.5 w-full border-t-0" />
      </div>
    </div>
  )
}
