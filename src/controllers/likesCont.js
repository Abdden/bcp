import Blog from '../models/Blog.js';

let blogStats = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });

  if (!blog.stats.user.includes(res.locals.email)) {
    const reloadLikes = blog.stats.likes + 1;
    const newUser = blog.stats.user;
    newUser.push(res.locals.email);

    await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        stats: {
          likes: reloadLikes,
          user: newUser,
        },
      }
    );
  } else {
    const newLikes = blog.stats.likes - 1;
    const allUsers = blog.stats.user.filter((creditor) => {
      return creditor !== res.locals.email;
    });
    await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        stats: {
          likes: newLikes,
          user: allUsers,
        },
      }
    );
  }
  const newBlog = await Blog.findOne({ _id: req.params.id });
  return res.send(newBlog);
};

export default blogStats;
