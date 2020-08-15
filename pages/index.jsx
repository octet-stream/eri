import User from "model/User"

export async function getServerSideProps() {
  console.log(await User.findByPk(1))
  return {
    props: {}
  }
}

function Home() {
  return <div>Hello, world</div>
}

export default Home
