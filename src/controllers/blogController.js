import Blog from '../models/Blog.js';


export class BlogController {
  static async blogOne(req, res) {
    try {
      const { title, content } = req.body;
      const blog = new Blog({
        title,
        image: req.file.path,
        content,
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

      if(req.body.title){
                await Blog.findOneAndUpdate({_id: req.params.id},{
                  title:req.body.title
                })
                }
                if(req.body.content){
                    await Blog.findOneAndUpdate({_id: req.params.id},{
                        content:req.body.content
                      })
                }
                if(req.file){
                    await Blog.findOneAndUpdate({_id: req.params.id},{
                        image:req.file.path
                      })
                }
                return res.status(200).json({
                    message:'Blog updated'
                })
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
    post.comments.push(comObj);
    await post.save();
    return res.send(post);
  }

  static async allCommentsBlog(req, res) {
    const post = await Blog.findOne({ _id: req.params.id });
    return res.send({ Comment: post.comments });
  }
}

export default BlogController;
