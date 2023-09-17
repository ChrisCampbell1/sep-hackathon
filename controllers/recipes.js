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

export { index, show, create, update, deleteRecipe }
