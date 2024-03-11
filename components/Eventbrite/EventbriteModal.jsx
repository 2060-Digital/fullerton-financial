import cn from "classnames"
import Close from "public/assets/close-modal.svg"

export default function Modal({ eventHash, isOpen, closeModal, focusRef }) {
  return (
    <>
      <div
        onClick={() => closeModal()}
        className={cn("overlay fixed bottom-0 left-0 right-0 top-0 z-[9998] h-full w-full bg-black bg-opacity-50", {
          hidden: !isOpen,
        })}
      />
      <div
        tabIndex={0}
        ref={focusRef}
        className={cn(
          "modal fixed left-0 top-0 z-[9999] h-[100dvh] w-full max-w-screen-lg transform overflow-y-auto bg-white sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 lg:h-auto",
          {
            hidden: !isOpen,
          },
        )}
      >
        <button
          onClick={() => closeModal()}
          aria-label="Close Modal"
          title="Close Modal"
          className="close-modal-btn absolute right-4 top-4 z-10 scale-[66%] overflow-hidden transition-all duration-300 hover:rotate-90 sm:scale-100"
        >
          <Close className="aspect-square w-4" />
        </button>
        <div className="flex w-full items-center lg:block lg:h-auto">
          <div id={eventHash} className="mx-auto" />
        </div>
      </div>
    </>
  )
}
