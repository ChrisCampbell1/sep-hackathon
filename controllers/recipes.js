import { Recipe } from '../models/recipe.js'
import { v2 as cloudinary } from 'cloudinary'

const index = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    .populate('author')
    res.status(200).json(recipes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const featured = async (req, res) => {
  try {
    const recipes = await Recipe.find({ share: true })
    .populate('author')
    res.status(200).json(recipes)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.status(200).json(recipe)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const recipe = await Recipe.create(req.body)
    res.status(200).json(recipe)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
      res.status(200).json(updatedRecipe)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
}

const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedRecipe)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const addImage = async (req, res) => {
  try {
    const imageFile = req.files.image.path
    const recipe = await Recipe.findById(req.params.id)
    const image = await cloudinary.uploader.upload(imageFile, { tags: `${req.user.email}` })
    recipe.image = image.url
    const savedRecipe = await recipe.save()
    res.status(200).json(savedRecipe)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const addVideo = async (req, res) => {
  try {
    const videoFile = req.files.video.path
    const recipe = await Recipe.findById(req.params.id)
    const video = await cloudinary.uploader.upload(videoFile, { tags: `${req.user.email}`, resource_type: `auto` })
    recipe.video = video.url
    const savedRecipe = await recipe.save()
    res.status(200).json(savedRecipe)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const addAudio = async (req, res) => {
  try {
    const audioFile = req.files.audio.path
    const recipe = await Recipe.findById(req.params.id)
    const audio = await cloudinary.uploader.upload(audioFile, { tags: `${req.user.email}`, resource_type: `auto` })
    recipe.audio = audio.url
    const savedRecipe = await recipe.save()
    res.status(200).json(savedRecipe)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { index, show, create, update, deleteRecipe, addImage, addVideo, addAudio, featured }
