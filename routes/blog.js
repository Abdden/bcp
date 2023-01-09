import express from 'express';
import passport from 'passport';
import validateArticle from '../validation/blogVal.js';
import BlogController from '../controllers/blogController.js';
import blogStats from '../controllers/likesCont.js';
import ComLikeMidWare from '../middlewares/likesComMid.js';
import validateComment from '../validation/comVal.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
import passGen from '../utils/passport.js';

passGen();

const router = express.Router();

router.get('/blogs', BlogController.viewBlogs, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'User Gets All The Available Blogs'
  // #swagger.summary = 'View All The Blogs'
});


router.get('/blogs/:id', BlogController. getOneBlog, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'User Gets Single Blog'
  // #swagger.summary = 'View a Single Blog'
});


router.post(
  '/blogs',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  validateArticle,
  BlogController.blogOne, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'Admin Creates a Blog'
  // #swagger.summary = 'Create/Post Blog'
  /* #swagger.parameters['Blog'] = {
               in: 'body',
               description: 'Necessary Blog Details',
               required: true,
               schema: { $ref: "#/definitions/Blog" }
  } */
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});


router.put(
  '/blogs/:id',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  validateArticle,
  BlogController.updateBlog, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'Admin Updates a Blog'
  // #swagger.summary = 'Update Blog Details'
  /* #swagger.parameters['Blog'] = {
               in: 'body',
               description: 'Necessary Blog Details',
               required: true,
               schema: { $ref: "#/definitions/Blog" }
  } */
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});


router.post('/blogs/:id/comments',
validateComment,
ComLikeMidWare,
BlogController.commentBlog, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'User Comments On a Blog'
  // #swagger.summary = 'Post comment'
  /* #swagger.parameters['Blog'] = {
               in: 'body',
               description: 'Comment Details',
               required: true,
               schema: { $ref: "#/definitions/Comment" }
  } */
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});


router.get('/blogs/:id/comments',
BlogController.allCommentsBlog, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'User Gets All Comments On a Blog'
  // #swagger.summary = 'View Single Blog Comments'
});


router.delete(
  '/blogs/:id',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  BlogController.deleteBlog, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'Admin Deletes a Blog'
  // #swagger.summary = 'Delete a Blog'
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});


router.post('/blogs/:id/stats',
ComLikeMidWare,blogStats, () => {
  // #swagger.tags = ['Blogs']
  // #swagger.description = 'User Likes or Unlikes a Blog'
  // #swagger.summary = 'Like/Unlike a Blog'
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});


export default router;
