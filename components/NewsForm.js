import styles from 'styles/components/NewsForm.module.css'
import FileBase64 from 'react-file-base64'







function NewsForm({title,btnTitle,handleChange,handleSubmit,handleImageChange,form,errors}) {

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h4 className={styles.title}>{title ? title : 'Form'}</h4>
        <input className={styles.input} placeholder='Headline' name='Headline' value={form.Headline} onChange={handleChange} />
        { errors ? errors.Headline ? `${errors.Headline}` : null : null }
        <textarea className={`${styles.input} ${styles.textarea}`} placeholder='Content' name='Content' value={form.Content} onChange={handleChange} />
        { errors ? errors.Content ? `${errors.Content}` : null : null }
        <input className={styles.input} placeholder='Posted By' name='PostedBy' value={form.PostedBy} onChange={handleChange} />
        { errors ? errors.PostedBy ? `${errors.PostedBy}` : null : null }

        <div className={styles.filegroup}>
          <p className={styles.filetext}>{form ? form.FeatureImage ? form.FeatureImage.originalName ? form.FeatureImage.originalName : '' : '' : ''}</p>
          <FileBase64  type="file" multiple={false} onDone={ (file) => handleImageChange('FeatureImage',file) } />
        </div>
        
        { errors ? errors.FeatureImage ? `${errors.FeatureImage}` : null : null }
        <button className={styles.btn} type='submit'>{btnTitle ? btnTitle : 'Submit'}</button>
      </form>
    </>
  )
}
export default NewsForm
