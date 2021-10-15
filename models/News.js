const mongoose = require('mongoose')




const ImageSchema = new mongoose.Schema({
  name: String,
  originalName: String,
  size: String,
  filetype: String,
  image: String,
})


const NewsSchema = new mongoose.Schema({
  Headline: {
    type: String,
    required: [true, 'Please add a Headline'],
    unique: true,
    maxlength: [100, 'Headline cannot be more than 100 characters']
  },
  Content: {
    type: String,
    required: true,
    maxlength: [10000, 'Content cannot be more than 10000 characters']
  },
  FeatureImage: {
    type: ImageSchema,
    default: () => ({})
  },
  PostedBy: String,
  StartDate: { 
    type: Date, 
    default: Date.now 
  },
  DatePosted: { 
    type: Date, 
    default: Date.now 
  },
})
// ,{ timestamps: true })



module.exports = mongoose.models.News || mongoose.model('News', NewsSchema)