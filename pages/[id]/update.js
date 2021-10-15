import styles from 'styles/layouts/Sections.module.css'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'
import Meta from 'components/layouts/Meta'
import NewsForm from 'components/NewsForm'

import sha256 from 'crypto-js/sha256'





function UpdateNews({ news }) {

  let initial = { Headline: '', Content: '', FeatureImage: {}, PostedBy: '' }
  const [form, setForm] = useState(news ? news : initial)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()
  const newsId = router.query.id


  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) { updateNews(); /*setForm(initial); setIsSubmitting(false)*/ }
      else setIsSubmitting(false)
    }
  },[errors])



  const updateNews = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/news/${newsId}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      router.push("/")
    } 
    catch (error) {
      console.log(error)
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    validate()
    setIsSubmitting(true)
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleImageChange = (name,image) => {

    if(image) {
      const privateKey = 'next-news-images'
      const imagename = sha256(JSON.stringify(image.file), privateKey).toString()

      const FeatureImage = {
        name: imagename,
        originalName: image.name,
        size: image.size,
        filetype: image.type,
        image: image.base64,
      }
      setForm({ ...form, FeatureImage })
    }
  }
  const validate = () => {
    let err = {}

    if(!form.Headline) err.Headline = 'Headline is required'
    if(!form.Content) err.Content = 'Content is required'
    if(!form.PostedBy) err.PostedBy = 'PostedBy is required'

    setErrors(err)
  }




  return (
    <>
      <Meta title="Update News" />
      <div className={styles.container}>
      
        {/*<h3 className={styles.title}>Update News</h3>*/}
        <div className={styles.wrapper}>
          {
            isSubmitting
            ? 'Loading'
            : <NewsForm title="Update News" btnTitle="Update" handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} form={form} errors={errors} />
          }
        </div>
      </div>
    </>
  )
}



UpdateNews.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/news/${id}`)
  const { data } = await res.json()

  return { news: data }
}
export default UpdateNews

