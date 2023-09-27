import Pagination from "components/Pagination"
import { useState } from "react"

export default {
  title: "Internal/Pagination",
  component: Pagination,
}

const Template = (args) => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <>
      <h1 id="storybook" className="text-center text-[24px]">
        Currently on page: {currentPage}
      </h1>

      {args.content}
      <Pagination
        scrollAnchor="storybook"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={args.pageCount}
      />
    </>
  )
}

export const LessThanFive = Template.bind({})
LessThanFive.args = {
  pageCount: 4,
}

export const BetweenFiveAndTen = Template.bind({})
BetweenFiveAndTen.args = {
  pageCount: 7,
}

export const TenPlus = Template.bind({})
TenPlus.args = {
  pageCount: 12,
}
export const WithContent = Template.bind({})
WithContent.args = {
  pageCount: 12,
  content: (
    <div>
      <h2 className="text-center text-[20px]">Scroll to the bottom to see pagination.</h2>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus ad error quia voluptatum delectus
      perspiciatis, maxime aperiam deserunt, cupiditate, dolore veritatis atque architecto ducimus tempore deleniti
      similique sequi iste explicabo nostrum? Quod repudiandae commodi sit, dicta, nam accusantium illum voluptatum vero
      inventore quae autem alias, sunt tempora similique facilis ea doloribus possimus eligendi cumque pariatur?
      Deserunt error reiciendis consequatur vel odit soluta optio reprehenderit a, est voluptatum. Alias similique,
      omnis at veritatis eos provident minus sapiente, ullam eligendi earum ipsam est suscipit cupiditate rerum iste
      numquam! Delectus quaerat dolorem voluptas quo harum explicabo veniam dolores deserunt modi ut? Quam minus omnis
      numquam et debitis suscipit, asperiores, autem saepe ab fuga voluptatum animi sunt quae tempore atque deleniti
      neque possimus vitae, libero eveniet magni reiciendis modi fugit dolore. Reiciendis, non tempora sed ab ducimus
      fuga laboriosam esse tempore nam omnis iure vero error mollitia unde ex blanditiis sit vel, velit doloribus,
      libero sint. In, deleniti obcaecati! Quos numquam magni, debitis neque nihil deleniti provident maiores optio illo
      pariatur id similique tempora repellendus. Nam quaerat accusantium eveniet modi officia corporis ea porro cum.
      Delectus, culpa? Mollitia culpa esse id iusto, ducimus reprehenderit iure eos? Cupiditate laborum ex maxime.
      Nobis, reiciendis deleniti. Unde laudantium, animi explicabo quaerat delectus officiis alias adipisci nihil
      quidem, labore commodi optio, voluptatem reiciendis! Accusantium repudiandae error eveniet nihil quis veritatis
      praesentium necessitatibus vel facilis, impedit cumque ipsa quisquam rem perspiciatis enim repellendus voluptas
      labore assumenda sunt? Commodi omnis, debitis quidem voluptatum dicta culpa magnam animi, quibusdam distinctio
      odio neque reprehenderit eius itaque voluptates porro vel! A vero tempora blanditiis eligendi sint ab quae
      possimus. Amet delectus suscipit eaque similique ab ullam quod, aut non praesentium repellat ipsum nulla nihil
      quis officiis illo animi sequi excepturi! Sequi saepe quod repellendus tempore mollitia ullam molestias temporibus
      tenetur vitae. Quaerat nesciunt expedita voluptatem eius nulla, harum, nobis, aliquid deleniti enim dignissimos
      facere fuga cumque sit aliquam voluptas quidem voluptate illum quod. Ullam error corporis nostrum excepturi
      possimus ex, sint at natus dolore adipisci fugiat quo soluta voluptas iste vitae! Quidem laudantium magnam,
      dignissimos tenetur iusto at natus corporis impedit mollitia libero! Magnam iusto ullam saepe, dignissimos ex
      voluptatem voluptatum tempore, necessitatibus aliquam eveniet pariatur enim. Esse cumque earum, praesentium nihil
      est, quisquam voluptates in aperiam quae ad, facilis quas saepe accusamus id. Quia accusamus omnis molestias
      expedita. Ratione non mollitia odit! Adipisci id corrupti hic reiciendis voluptatum possimus fuga, laudantium, ad,
      ipsam esse illo iste. Laboriosam natus, illum odit ut inventore autem animi? Aspernatur eum quo, a vitae eligendi
      rerum, eius iusto rem natus quia dicta necessitatibus cumque magni perspiciatis animi quaerat adipisci quibusdam
      saepe. Esse a alias eius dolore dolorem iste rerum minima sit quaerat nostrum fugiat hic voluptates libero, neque
      officiis accusantium quas consequuntur! Molestias repellendus illo exercitationem architecto dolor assumenda
      explicabo. Perspiciatis consequatur mollitia explicabo illum porro nihil quibusdam, aliquam sequi aliquid ab?
      Ipsum veritatis error optio voluptatem iste cumque numquam totam nam. Eum, aliquam amet pariatur ullam dolorem
      unde eveniet, provident voluptate quidem quibusdam sed quia error? Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Repellendus ad error quia voluptatum delectus perspiciatis, maxime aperiam deserunt, cupiditate,
      dolore veritatis atque architecto ducimus tempore deleniti similique sequi iste explicabo nostrum? Quod
      repudiandae commodi sit, dicta, nam accusantium illum voluptatum vero inventore quae autem alias, sunt tempora
      similique facilis ea doloribus possimus eligendi cumque pariatur? Deserunt error reiciendis consequatur vel odit
      soluta optio reprehenderit a, est voluptatum. Alias similique, omnis at veritatis eos provident minus sapiente,
      ullam eligendi earum ipsam est suscipit cupiditate rerum iste numquam! Delectus quaerat dolorem voluptas quo harum
      explicabo veniam dolores deserunt modi ut? Quam minus omnis numquam et debitis suscipit, asperiores, autem saepe
      ab fuga voluptatum animi sunt quae tempore atque deleniti neque possimus vitae, libero eveniet magni reiciendis
      modi fugit dolore. Reiciendis, non tempora sed ab ducimus fuga laboriosam esse tempore nam omnis iure vero error
      mollitia unde ex blanditiis sit vel, velit doloribus, libero sint. In, deleniti obcaecati! Quos numquam magni,
      debitis neque nihil deleniti provident maiores optio illo pariatur id similique tempora repellendus. Nam quaerat
      accusantium eveniet modi officia corporis ea porro cum. Delectus, culpa? Mollitia culpa esse id iusto, ducimus
      reprehenderit iure eos? Cupiditate laborum ex maxime. Nobis, reiciendis deleniti. Unde laudantium, animi explicabo
      quaerat delectus officiis alias adipisci nihil quidem, labore commodi optio, voluptatem reiciendis! Accusantium
      repudiandae error eveniet nihil quis veritatis praesentium necessitatibus vel facilis, impedit cumque ipsa
      quisquam rem perspiciatis enim repellendus voluptas labore assumenda sunt? Commodi omnis, debitis quidem
      voluptatum dicta culpa magnam animi, quibusdam distinctio odio neque reprehenderit eius itaque voluptates porro
      vel! A vero tempora blanditiis eligendi sint ab quae possimus. Amet delectus suscipit eaque similique ab ullam
      quod, aut non praesentium repellat ipsum nulla nihil quis officiis illo animi sequi excepturi! Sequi saepe quod
      repellendus tempore mollitia ullam molestias temporibus tenetur vitae. Quaerat nesciunt expedita voluptatem eius
      nulla, harum, nobis, aliquid deleniti enim dignissimos facere fuga cumque sit aliquam voluptas quidem voluptate
      illum quod. Ullam error corporis nostrum excepturi possimus ex, sint at natus dolore adipisci fugiat quo soluta
      voluptas iste vitae! Quidem laudantium magnam, dignissimos tenetur iusto at natus corporis impedit mollitia
      libero! Magnam iusto ullam saepe, dignissimos ex voluptatem voluptatum tempore, necessitatibus aliquam eveniet
      pariatur enim. Esse cumque earum, praesentium nihil est, quisquam voluptates in aperiam quae ad, facilis quas
      saepe accusamus id. Quia accusamus omnis molestias expedita. Ratione non mollitia odit! Adipisci id corrupti hic
      reiciendis voluptatum possimus fuga, laudantium, ad, ipsam esse illo iste. Laboriosam natus, illum odit ut
      inventore autem animi? Aspernatur eum quo, a vitae eligendi rerum, eius iusto rem natus quia dicta necessitatibus
      cumque magni perspiciatis animi quaerat adipisci quibusdam saepe. Esse a alias eius dolore dolorem iste rerum
      minima sit quaerat nostrum fugiat hic voluptates libero, neque officiis accusantium quas consequuntur! Molestias
      repellendus illo exercitationem architecto dolor assumenda explicabo. Perspiciatis consequatur mollitia explicabo
      illum porro nihil quibusdam, aliquam sequi aliquid ab? Ipsum veritatis error optio voluptatem iste cumque numquam
      totam nam. Eum, aliquam amet pariatur ullam dolorem unde eveniet, provident voluptate quidem quibusdam sed quia
      error?
    </div>
  ),
}
