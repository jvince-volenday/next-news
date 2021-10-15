import styles from 'styles/layouts/Sections.module.css'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'
import Meta from 'components/layouts/Meta'
import NewsForm from 'components/NewsForm'

import md5 from 'crypto-js/md5'






function CreateNews({}) {

  let initial = { Headline: '', Content: '', FeatureImage: {}, PostedBy: '' }
  const [form, setForm] = useState(initial)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()



  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) { newNews(); /*setForm(initial); setIsSubmitting(false)*/ }
      else setIsSubmitting(false)
    }
  },[isSubmitting,errors])



  async function newNews() {
    try {
      const res = await fetch('http://localhost:3000/api/news', {
        method: 'POST',
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



  function handleSubmit(e) {
    e.preventDefault()
    validate()
    setIsSubmitting(true)    
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleImageChange = (name,image) => {

    if(image) {

      const privateKey = 'next-news-images'
      const imagename = md5(JSON.stringify(image.image), privateKey).toString()

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
  function validate() {
    let err = {}

    if(!form.Headline) err.Headline = 'Headline is required'
    if(!form.Content) err.Content = 'Content is required'
    if(!form.PostedBy) err.PostedBy = 'PostedBy is required'
    
    setErrors(err)
  }



  return (
    <>
      <Meta title="Create News" />
      <div className={styles.container}>
        {/*<h3 className={styles.title}>Create News</h3>*/}
        <div className={styles.wrapper}>
          {
            isSubmitting
            ? 'Loading'
            : <NewsForm title="Create News" btnTitle="Create" handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} form={form} errors={errors} />
          }
        </div>
      </div>
    </>
  )
}
export default CreateNews




