import db from "lib/db/connection"

export async function getServerSideProps() {
  await db.authenticate()

  return {
    props: {}
  }
}

function Home() {
  return <div>Hello, world</div>
}

export default Home
