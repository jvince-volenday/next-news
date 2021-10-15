import 'styles/layouts/Layout.module.css'
import Nav from 'components/layouts/Nav'
import Meta from 'components/layouts/Meta'





function Layout({children}) {
  

  return (
    <>
      <Meta />
      <Nav />
      <div>
        <main>
          {/*<Header />*/}
          {children}
        </main>
      </div>
    </>
  )
}
export default Layout
