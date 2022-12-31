import likesVal from '../validation/likesVal.js';
import Blog from '../models/Blog.js';
import Login from '../models/Login.js';

let blogStats = async (req, res) => {
  // const { error } = likesVal(req.body);
  // if (error) {
  //   return res.send(error.details[0].message);
  // } else {
  const blog = await Blog.findOne({ _id: req.params.id });

  // const likeAuth = res.header('likesHeader', 'liking blog');
  // if (likeAuth) {
  //   const reloadLikes = blog.stats.likes + 1;
  //   // const newUser = blog.stats.user;
  //   // newUser.push(Login.findOne(({ email:  })));

  //   await Blog.findOneAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       stats: {
  //         likes: reloadLikes,
  //         // user: newUser,
  //       },
  //     }
  //   );
  // } else {
  //   const newLikes = blog.stats.likes - 1;
  //   // const allUsers = blog.stats.user.filter((creditor) => {
  //   //   return creditor !== req.body.email;
  //   // });
  //   await Blog.findOneAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       stats: {
  //         likes: newLikes,
  //         // user: allUsers,
  //       },
  //     }
  //   );
  //   res.header('likesHeader', 'unliking blog');
  // }

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
  res.send(newBlog);
};
// };

export default blogStats;
