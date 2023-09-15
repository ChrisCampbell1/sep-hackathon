import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  relatives: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  pendingRelatives: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  bio: String
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
