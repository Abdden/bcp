import app from '../index.js';
import request from 'supertest';
import Blog from '../models/Blog';
import Contact from '../models/Contact.js';
import { randomString } from '../../test_samples.js';
const testImage = `${__dirname}/LOL - Wild Rift.jpg`


test('Getting Signed Up Users', async () => {
  const resBody = await request(app).get('/users').set("Authorization", process.env.AUTHKEY).send()
  expect(resBody.statusCode).toBe(200);
});


test('Admin Sign Up', async () => {
  const resBody = await request(app).post('/signup/admin').set("Authorization", process.env.AUTHKEY).send({
    name: `Cyber${randomString(5)}Punk`,
    email: `cyber${randomString(5)}@gmail.com`,
    password: "Andela123#",
  })
  expect(resBody.statusCode).toBe(200);
});


test('Admin Sign Up Email Already Exists', async () => {
  const resBody = await request(app).post('/signup/admin').set("Authorization", process.env.AUTHKEY).send({
    name: `Cyber${randomString(5)}Punk`,
    email: `spirit@gmail.net`,
    password: "Andela123#",
  })
  expect(resBody.statusCode).toBe(409);
});


test('Getting All The Blogs', async () => {
  const resBody = await request(app).get('/blogs').send()
  expect(resBody.statusCode).toBe(200);
});


// test('Posting a Blog', async () => {
//   const fd = new FormData()
//   fd.append("title", `DUMMIE ${randomString(5)} BLOG`)
//   fd.append("image", `${__filename}LOL - Wild Rift.jpg`)
//   fd.append("content", "This Is Simply Dummy Data Provided For The Sole Purpose Of The Tests...")
//   const resBody = await request(app).post('/blogs').set('Authorization', process.env.AUTHKEY).field().send({fd})
//   expect(resBody.statusCode).toBe(200);
// });


// test('Liking a Blog', async () => {
//   const blog = await Blog.findOne();
//   const id = blog._id;
//   const resBody = await request(app).post('/blogs/' + id + '/stats').set('Authorization', process.env.AUTHKEY).send()
//   expect(resBody.statusCode).toBe(200);
// });


// test('Updating a Blog', async () => {
//   const blog = await Blog.findOne();
//   const id = blog._id;
//   const resBody = await request(app).patch('/blogs/' + id).set('Authorization', process.env.AUTHKEY).send({
//     title: `DUMMIE ${randomString(5)} BLOG`,
//     image: testImage,
//     content: "This Is Simply Dummy Data Provided For The Sole Purpose Of The Tests..."
//   })
//   expect(resBody.statusCode).toBe(200);
// });


// test('Posting a Blog Already Exists', async () => {
//   const resBody = await request(app).post('/blogs').set('Authorization', process.env.AUTHKEY).send({
//     title: `HERE'S TO THE NEW BLOGS OF TECH`,
//     image: testImage,
//     content: "This Is Simply Dummy Data Provided For The Sole Purpose Of The Tests..."
//   })
//   expect(resBody.statusCode).toBe(409);
// });


// test("Getting Single Blog", async () => {
//   const blog = await Blog.findOne();
//   const id = blog._id;
//   const resBody = await request(app)
//     .get("/blogs/" + id)
//     .send();
//   expect(resBody.statusCode).toBe(200);
// });


// test("Delete Blog", async () => {
//   const blog = await Blog.findOne();
//   const id = blog._id;
//   const resBody = await request(app).delete("/blogs/" + id).set("Authorization", process.env.AUTHKEY).send();
//   expect(resBody.statusCode).toBe(204);
// });


// test("Getting Single Blog Comments", async () => {
//   const blog = await Blog.findOne();
//   const id = blog._id;
//   const resBody = await request(app)
//     .get("/blogs/" + id + "/comments")
//     .send();
//   expect(resBody.statusCode).toBe(200);
// });


// test("Commenting On Blog", async () => {
//   const blog = await Blog.findOne();
//   const id = blog._id;
//   const resBody = await request(app).post("/blogs/" + id + "/comments").set("Authorization", process.env.AUTHKEY).send({
//       comment: `This Is a Dummy Comment ${randomString(5)}`,
//     })
//   expect(resBody.statusCode).toBe(200);
// });


test('Sending User Query', async () => {
  const resBody = await request(app).post('/contact').send({
    names: `QUERIES ${randomString(5)}`,
    email: `abudd${randomString(5)}@gmail.com`,
    subject: "DUMMY SUBJECT",
    message: "This Is a Dummy Message For The Tests..."
  })
  expect(resBody.statusCode).toBe(200);
});


test('View User Queries', async () => {
  const resBody = await request(app).get('/contacts').set("Authorization", process.env.AUTHKEY).send()
  expect(resBody.statusCode).toBe(200);
});


test('Delete User Query', async () => {
  const query = await Contact.findOne();
  const id = query._id;
  const resBody = await request(app).delete('/contact/' + id).set("Authorization", process.env.AUTHKEY).send()
  expect(resBody.statusCode).toBe(204);
});


test('User Login', async () => {
  const resBody = await request(app).post('/login').send({
    email: "scammer@gmail.com",
    password: "Test123#",
  })
  expect(resBody.statusCode).toBe(200);
});


test('User Login Invalid Inputs', async () => {
  const resBody = await request(app).post('/login').send({
    email: "uknown@gmail.net",
    password: "USER123#",
  })
  expect(resBody.statusCode).toBe(404);
});


test("User Signup", async () => {
  const resBody = await request(app)
    .post("/signup")
    .send({
      name: `Cyber${randomString(5)}Punk`,
      email: `cyber${randomString(5)}@gmail.com`,
      password: "Andela123#",
    });
  expect(resBody.statusCode).toBe(200);
});


test('User Signup Already Exists', async () => {
  const resBody = await request(app).post('/signup').send({
    name: "CrazyScammer",
    email: "scammer@gmail.com",
    password: "Test123#",
  })
  expect(resBody.statusCode).toBe(409);
});
