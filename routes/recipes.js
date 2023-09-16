import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, recipesCtrl.index)
router.get('/:id', checkAuth, recipesCtrl.show)
router.post('/', checkAuth, recipesCtrl.create)
router.put('/:id', checkAuth, recipesCtrl.update)
router.delete('/:id', checkAuth, recipesCtrl.deleteRecipe)
// router.put('/:id/add-photo', checkAuth, recipesCtrl.addPhoto)

export { router }
