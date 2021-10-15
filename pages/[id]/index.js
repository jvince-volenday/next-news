import styles from 'styles/layouts/Sections.module.css'
import stylesNewsCard from 'styles/pages/NewsCardId.module.css'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import fetch from 'isomorphic-unfetch'
import Meta from 'components/layouts/Meta'

import TimeAgo from 'timeago-react'






function News({ news }) {

  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const newsId = router.query.id


  useEffect(() => {
    if(isDeleting) deleteNews()
  },[isDeleting])

    

  const handleDelete = () => setIsDeleting(true)
  const deleteNews = async () => {
    try {
      const deleted = await fetch(`http://localhost:3000/api/news/${newsId}`, {
        method: "DELETE"
      })
      router.push("/")
    } 
    catch (error) {
      console.log(error)
    }
  }




  return (
    <>
      <Meta title={news.Headline ? news.Headline : 'News'} />
      <div className={styles.container}>
        {/*<h3 className={styles.title}>{news.Headline}</h3>*/}
        <div className={styles.wrapper}>
          { 
            isDeleting ? 'Loading' : <NewsCardId news={news} handleDelete={handleDelete}/>
          }
        </div>
      </div>
    </>
  )
}
export default News



News.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/news/${id}`)
  const { data } = await res.json()

  return { news: data }
}




function NewsCardId({news,handleDelete}) {
  

  return (
    <>
      {
        news 
        ?
          <>
            <div className={stylesNewsCard.container} >

              <h4 className={stylesNewsCard.title}>{news.Headline}</h4>
              <div className={stylesNewsCard.header}>
                <p className={`${stylesNewsCard.posted} subtitle2`}>Posted by {news.PostedBy}</p>
                <p className={`${stylesNewsCard.posted} ${stylesNewsCard.divider}`}>|</p>
                {/*<TimeAgo className={`${stylesNewsCard.posted} datetime={news.DatePosted} locale='en' />*/}
                <p className={`${stylesNewsCard.posted} subtitle2`}>
                  <TimeAgo datetime={news.DatePosted} locale='en' />
                </p>
              </div>


              <div className={stylesNewsCard.img_group}>
                <img className={stylesNewsCard.img} src={news ? news.FeatureImage ? news.FeatureImage.image ? news.FeatureImage.image : '' : '' : ''} alt={`${news.Headline}_img`} />
              </div>


              <div className={stylesNewsCard.body}>
                <p>{news.Content}</p>
              </div>


              <div>
                <Link href={`/${news._id}/update`}>
                  <button className={`${stylesNewsCard.btn} button`}>Update</button>
                </Link>
                <button className={stylesNewsCard.btn} onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </>
        : null
      }
    </>
  )
}
