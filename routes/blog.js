import express from 'express';
import passport from 'passport';
import validateArticle from '../validation/blogVal.js';
import BlogController from '../controllers/blogController.js';
import blogStats from '../controllers/likesCont.js';
import ComLikeMidWare from '../middlewares/likesComMid.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
import passGen from '../utils/passport.js';

passGen();

const router = express.Router();

router.get('/blogs', BlogController.viewBlogs);
router.get('/blogs/:id', BlogController.getOneBlog);
router.post(
  '/blogs',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  validateArticle,
  BlogController.blogOne
  );
router.put(
  '/blogs/:id',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  validateArticle,
  BlogController.updateBlog
  );
router.post('/blogs/:id/comments', ComLikeMidWare, BlogController.commentBlog);
router.get('/blogs/:id/comments', BlogController.allCommentsBlog);
router.delete(
  '/:id',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  BlogController.deleteBlog
);
router.post('/blogs/:id/stats', ComLikeMidWare,blogStats);

export default router;

// passport.authenticate('jwt', { session: false });

// // Get All blogs
// router.get('/blogs', async (req, res) => {
//   const blogs = await Blog.find();
//   res.send(blogs);
// });

// Create New Post
// router.post('/blogs', async (req, res) => {
//   const { error } = validateArticle(req.body);
//   if (error) {
//     return res.send(error.details.map((err) => err.message));
//   } else {
//     const result = await blogValidator.validateAsync(req.body);
//     const { title, image, content } = req.body;
//     const post = new Blog({
//       title,
//       image,
//       content,
//     });
//     await post.save();
//     return res.send(post);
//   }
// });

// Create New Comment
// router.post('/blogs/:id/comments', async (req, res) => {
//   const post = await Blog.findOne({ _id: req.params.id });
//   const comment = {
//     name: req.body.name,
//     comment: req.body.comment,
//   };
//   post.comments.push(comment);
//   await post.save();
//   res.send(post);
// });

// Create New Like
// router.post('/blogs/:id/likes', async (req, res) => {
//   const post = await Blog.findOne({ _id: req.params.id });

//   if (post.likes == null) {
//     post.likes = 0;
//     post.likes++;
//   } else {
//     post.likes++;
//   }
//   await post.save();
//   res.send(post);
// });

// Delete Like
// router.post('/blogs/:id/unlike', async (req, res) => {
//   const post = await Blog.findOne({ _id: req.params.id });

//   if (post.likes === null || post.likes === 0) {
//     post.likes = 0;
//   } else {
//     post.likes--;
//   }
//   await post.save();
//   res.send(post);
// });

// Get One Post
// router.get('/blogs/:id', async (req, res) => {
//   try {
//     const post = await Blog.findOne({ _id: req.params.id });
//     res.send(post);
//   } catch {
//     res.status(404);
//     res.send({ error: "Post doesn't exist!" });
//   }
// });

// Update One Post
// router.patch('/blogs/:id', async (req, res) => {
//   try {
//     const post = await Blog.findOne({ _id: req.params.id });

//     if (req.body.title) {
//       post.title = req.body.title;
//     }

//     if (req.body.image) {
//       post.image = req.body.image;
//     }

//     if (req.body.content) {
//       post.content = req.body.content;
//     }

//     await post.save();
//     res.send(post);
//   } catch {
//     res.status(404);
//     res.send({ error: "Post doesn't exist!" });
//   }
// });

// // Delete One Post
// router.delete('/blogs/:id', async (req, res) => {
//   try {
//     await Blog.deleteOne({ _id: req.params.id });
//     res.status(204).send();
//   } catch {
//     res.status(404);
//     res.send({ error: "Post doesn't exist!" });
//   }
// });
