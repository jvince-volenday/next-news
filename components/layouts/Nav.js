import styles from 'styles/layouts/Nav.module.css'
import Link from 'next/link'




function Nav({}) {
  

  const links = [
    /*{
      title: 'Home',
      link: '/'
    },*/
    {
      title: 'Create',
      link: '/create'
    },
  ]

  return (
    <>
      <div className={styles.container}>
        <div className={styles.group}>
        <div>
          <Link href="/" >
            <a className={`${styles.link} ${styles.link_logo} h6`}>Next News</a>
          </Link>
        </div>  
        <ul className={styles.links}>
          {
            links.length > 0 
              ? links.map((obj) => <NavLink key={obj.link} link={obj.link} title={obj.title} />)
              : null
          }
        </ul>
        </div>
      </div>
    </>
  )
}
export default Nav





function NavLink({title,link}) {
  

  return (
    <>
      <li>
        <Link href={link}>
          <a className={styles.link} >{title}</a>
        </Link>
      </li>
    </>
  )
}