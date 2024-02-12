import cn from "classnames"
import Close from "public/assets/close-modal.svg"

export default function Modal({ eventHash, isOpen, closeModal, focusRef }) {
  return (
    <>
      <div
        onClick={() => closeModal()}
        className={cn("overlay fixed w-full h-full top-0 left-0 right-0 bottom-0 z-[9998] bg-black bg-opacity-50", {
          hidden: !isOpen,
        })}
      />
      <div
        tabIndex={0}
        ref={focusRef}
        className={cn(
          "modal fixed bg-white max-h-[100dvh] overflow-y-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-screen-lg",
          {
            hidden: !isOpen,
          },
        )}
      >
        <button
          onClick={() => closeModal()}
          aria-label="Close Modal"
          title="Close Modal"
          className="close-modal-btn absolute overflow-hidden top-4 right-4 z-10 scale-[66%] sm:scale-100 hover:rotate-90 transition-all duration-300"
        >
          <Close className="w-4 aspect-square" />
        </button>
        <div className="h-[100dvh] lg:h-auto w-full flex items-center lg:block my-12 lg:my-0">
          <div id={eventHash} />
        </div>
      </div>
    </>
  )
}
