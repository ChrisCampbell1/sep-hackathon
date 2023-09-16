import { Recipe } from '../models/recipe.js'
import { v2 as cloudinary } from 'cloudinary'

const index = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
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

export { index, show, create }