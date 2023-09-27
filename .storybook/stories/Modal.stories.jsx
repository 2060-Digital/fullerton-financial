import Modal from "components/Modal"
import CallToAction from "components/CallToAction"
import useModal from "utilities/useModal"

export default {
  title: "Internal/Modal",
  component: Default,
  parameters: {
    docs: {
      description: {
        component:
          "This component requires the user to use the useModal hook and pass in isOpen, closeModal, and focusRef to the component as props.",
      },
    },
    nextjs: {
      router: {
        asPath: "/#storybook",
      },
    },
  },
  argTypes: {
    children: {
      description: "The Modal's content",
      type: { required: true },
    },
    isOpen: {
      description: "Passed in from useModal hook. Boolean which determines whether modal is open",
    },
    closeModal: {
      description: "Passed in from useModal hook. Function that closes the modal and sets isOpen to false.",
    },
    focusRef: {
      description: "Passed in from useModal hook.",
    },
  },
}

export const Default = () => {
  const fragment = "#storybook"
  const [isOpen, closeModal, openModal, focusRef] = useModal(fragment)

  return (
    <div>
      <CallToAction href={fragment} id="open-storybook-modal" button onClick={openModal}>
        Open Modal
      </CallToAction>
      <Modal {...{ isOpen, closeModal, focusRef }}>
        <h1>Storybook Modal</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit voluptas obcaecati est ea soluta omnis
          aspernatur deleniti recusandae iste, cum deserunt odit? Totam reiciendis sequi atque molestiae laboriosam
          sapiente cum unde quo perspiciatis, nulla illo alias laborum necessitatibus architecto fuga. Magnam quisquam
          non ipsum sed, reprehenderit esse aut odio error provident qui quod quam officiis voluptas saepe laborum,
          magni dolorum possimus. Doloremque dolore natus tempora ad dolores ratione adipisci molestias quibusdam. Rem
          nisi explicabo, consequatur temporibus placeat at quod culpa tempore alias maiores natus blanditiis dolor quo
          aperiam dignissimos voluptatum amet. Placeat illo beatae quidem, consequatur officiis quisquam perferendis
          sequi.
        </p>
      </Modal>
    </div>
  )
}
