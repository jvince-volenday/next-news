import styles from 'styles/layouts/Sections.module.css'
import fetch from 'isomorphic-unfetch'
import NewsCard from 'components/NewsCard'





function Index({ news }) {
  
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Today's Next News</h3>
        <div className={styles.wrapper}>
          { 
            news ? news.length > 0 ? news.map(news => <NewsCard key={news._id} news={news}/>) : null : null
          }
        </div>
      </div>
    </>
  )
}



Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/news')
  const { data } = await res.json()
  return { news: data }
}
export default Index





