import Blog from '../models/Blog.js';
import cloudinary from '../cloudinary.js';

export class BlogController {
  static async blogOne(req, res) {
    try {
      const { title, image, content, comment } = req.body;
      const snapBack = await cloudinary.uploader.upload(image, {
        folder: 'my_brand_snaps',
      });
      const blog = new Blog({
        title,
        image: { public_id: snapBack.public_id, url: snapBack.secure_url },
        content,
        comment,
      });
      const inDb = await Blog.findOne({ title: title });
      if (inDb) {
        return res.status(400).send('Blog Already Exists!');
      }
      await blog.save();
      return res.send(blog);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async viewBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      return res.status(200).json({ blogs });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async deleteBlog(req, res) {
    try {
      await Blog.deleteOne({ _id: req.params.id });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async updateBlog(req, res) {
    try {
      // const post = await Blog.findOne({ _id: req.params.id });

      // if (req.body.title) {
      //   post.title = req.body.title;
      // }

      // if (req.body.image) {
      //   post.image = req.body.image;
      // }

      // if (req.body.content) {
      //   post.content = req.body.content;
      // }

      const { title, image, content } = req.body;
      const snapBack = await cloudinary.uploader.upload(image, {
        folder: 'my_brand_snaps',
      });
      const theUpdated = {
        title,
        image: { public_id: snapBack.public_id, url: snapBack.secure_url },
        content,
      };

      await Blog.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          title: theUpdated.title,
          image: theUpdated.image,
          content: theUpdated.content,
        }
      );

      // await post.save();
      return res.send(theUpdated);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async getOneBlog(req, res) {
    try {
      const post = await Blog.findOne({ _id: req.params.id });
      return res.send(post);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  static async commentBlog(req, res) {
    const post = await Blog.findOne({ _id: req.params.id });
    const comObj = {
      name : res.locals.name,
      email : res.locals.email,
      comment : req.body.comment
    }
    // const { comment } = req.body;
    post.comments.push(comObj);
    await post.save();
    res.send(post);
  }

  static async allCommentsBlog(req, res) {
    const post = await Blog.findOne({ _id: req.params.id });
    res.send({ Comment: post.comments });
  }

  // static async likeBlog(req, res) {
  //   try {
  //     const post = await Blog.findOne({ _id: req.params.id });

  //     if (post.likes == null) {
  //       post.likes = 0;
  //       post.likes++;
  //     } else {
  //       post.likes++;
  //     }
  //     await post.save();
  //     res.send(post);
  //   } catch (error) {
  //     return res.status(500).json({ error: error });
  //   }
  // }

  // static async unLikeBlog(req, res) {
  //   try {
  //     const post = await Blog.findOne({ _id: req.params.id });

  //     if (post.likes === null || post.likes === 0) {
  //       post.likes = 0;
  //     } else {
  //       post.likes--;
  //     }
  //     await post.save();
  //     res.send(post);
  //   } catch (error) {
  //     return res.status(500).json({ error: error });
  //   }
  // }
}

export default BlogController;
