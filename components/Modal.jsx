export default function Modal({ children, isOpen, closeModal, focusRef }) {
  return isOpen ? (
    <>
      <div
        onClick={() => closeModal()}
        className="overlay fixed w-full h-full top-0 left-0 right-0 bottom-0 z-[9998] bg-black bg-opacity-50"
      />
      <div
        tabIndex={0}
        ref={focusRef}
        className="modal fixed bg-white max-h-[100dvh] overflow-y-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-screen-lg"
      >
        <button
          onClick={() => closeModal()}
          aria-label="Close Modal"
          title="Close Modal"
          className="close-modal-btn absolute -top-[11px] -right-[11px] overflow-hidden sm:top-0 sm:right-0 z-10 scale-[66%] sm:scale-100"
        >
          X
        </button>
        <div className="h-[100dvh] lg:h-auto w-full flex items-center lg:block">{children}</div>
      </div>
    </>
  ) : null
}
