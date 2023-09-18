import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: String,
  image: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  description: String,
  audio: String,
  video: String,
  recipeYield: String,
  recipeCategory: String,
  recipeCuisine: String,
  ingredients: [String],
  instructions: [String],
  share: Boolean
},{
  timestamps: true,
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export { Recipe }
