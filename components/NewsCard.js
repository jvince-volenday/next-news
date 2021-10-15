import styles from 'styles/components/NewsCard.module.css'
import Link from 'next/link'
import dateFormat from "dateformat"




function NewsCard({news}) {



  return (
    <>
      <div className={styles.container}>

        <div className={styles.img_group}>
          <img className={styles.img} src={news ? news.FeatureImage ? news.FeatureImage.image ? news.FeatureImage.image : '' : '' : ''} alt={`${news.Headline}_img`} />
        </div>

        <div className={styles.header}>
          <Link href={`/${news._id}`}>
            <h5 className={styles.title}>{news.Headline}</h5>
          </Link>
          <p className={`${styles.posted} subtitle2`}>Posted by {news.PostedBy}</p>
          <p className={`${styles.posted} subtitle2`}>{dateFormat(news.DatePosted, "ddd, mmm d, yyyy, h:MM TT")}</p>
        </div>


        <div className={styles.body}>
          <p>{news.Content}</p>
        </div>

        <div>
          <Link href={`/${news._id}`}>
            <button className={`${styles.btn} button`}>View</button>
          </Link>
          <Link href={`/${news._id}/update`}>
            <button className={`${styles.btn} button`}>Update</button>
          </Link>
        </div>

      </div>
    </>
  )
}
export default NewsCard