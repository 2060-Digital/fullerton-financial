export default function Modal({ children, isOpen, closeModal, focusRef }) {
  return isOpen ? (
    <>
      <div
        onClick={() => closeModal()}
        className="overlay fixed bottom-0 left-0 right-0 top-0 z-[9998] h-full w-full bg-black bg-opacity-50"
      />
      <div
        tabIndex={0}
        ref={focusRef}
        className="modal fixed left-1/2 top-1/2 z-[9999] max-h-[100dvh] w-full max-w-screen-lg -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto bg-white"
      >
        <button
          onClick={() => closeModal()}
          aria-label="Close Modal"
          title="Close Modal"
          className="close-modal-btn absolute -right-[11px] -top-[11px] z-10 scale-[66%] overflow-hidden sm:right-0 sm:top-0 sm:scale-100"
        >
          X
        </button>
        <div className="flex h-[100dvh] w-full items-center lg:block lg:h-auto">{children}</div>
      </div>
    </>
  ) : null
}
