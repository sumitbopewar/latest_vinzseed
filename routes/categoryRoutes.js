import express from 'express';
import { isAdmin , requireSignIn } from './../middleware/authMiddleware.js';
import { categoryControlller, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategoryController } from '../controller/createCategoryController.js';


const router = express.Router() 

// routes create category routes
router.post('/create-category', requireSignIn , isAdmin , createCategoryController);

// update category routes
router.put('/update-category/:id', requireSignIn , isAdmin , updateCategoryController);


//  get all categories  routes
router.get('/get-category', categoryControlller);


// single category routes
router.get('/single-category/:slug', singleCategoryController);


// delete category routes
router.delete('/delete-category/:id', requireSignIn , isAdmin , deleteCategoryCOntroller);


export default router;