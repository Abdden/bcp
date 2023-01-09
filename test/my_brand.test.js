import app from '../index.js';
import request from 'supertest';
import Blog from '../models/Blog';
import Contact from '../models/Contact.js';
import { imgURI, randomString } from '../uri.js';


test('Getting Signed Up Users', async () => {
  const resBody = await request(app).get('/signup').set("Authorization", process.env.AUTHKEY).send()
  expect(resBody.statusCode).toBe(200);
});


test('Admin Sign Up', async () => {
  const resBody = await request(app).post('/signup/admin').set("Authorization", process.env.AUTHKEY).send({
    name: `Cyber${randomString(5)}Punk`,
    email: `cyber${randomString(5)}@gmail.com`,
    password: "adminandela12345",
  })
  expect(resBody.statusCode).toBe(200);
});


test('Getting All The Blogs', async () => {
  const resBody = await request(app).get('/blogs').send()
  expect(resBody.statusCode).toBe(200);
});


test('Posting a Blog', async () => {
  const resBody = await request(app).post('/blogs').set('Authorization', process.env.AUTHKEY).send({
    title: `QWERTY ${randomString(5)} mbvmvbmdj`,
    image: imgURI,
    content: "gDNGDJDJDGDNGDNGDMHDMDMDMDDMDHDDMDMDMDDDYDHDYDHMDHMYDYD"
  })
  expect(resBody.statusCode).toBe(200);
});


test('Liking a Blog', async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).post('/blogs/' + id + '/stats').set('Authorization', process.env.AUTHKEY).send()
  expect(resBody.statusCode).toBe(200);
});


test('Updating a Blog', async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).put('/blogs/' + id).set('Authorization', process.env.AUTHKEY).send({
    title: `QWERTY ${randomString(5)} mbvmvbmdj`,
    image: imgURI,
    content: "gDNGDJDJDGDNGDNGDMHDMDMDMDDMDHDDMDMDMDDDYDHDYDHMDHMYDYD"
  })
  expect(resBody.statusCode).toBe(200);
});


test("Getting Single Blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app)
    .get("/blogs/" + id)
    .send();
  expect(resBody.statusCode).toBe(200);
});


test("Delete Blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).delete("/blogs/" + id).set("Authorization", process.env.AUTHKEY).send();
  expect(resBody.statusCode).toBe(204);
});


test("Getting Single Blog Comments", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app)
    .get("/blogs/" + id + "/comments")
    .send();
  expect(resBody.statusCode).toBe(200);
});


test("Commenting On Blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).post("/blogs/" + id + "/comments").set("Authorization", process.env.AUTHKEY).send({
      comment: `Something crazy ${randomString(5)} making this whole thing fail...`,
    })
  expect(resBody.statusCode).toBe(200);
});


test("Liking a Blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).post("/blogs/" + id + "/stats").set("Authorization", process.env.AUTHKEY).send()
  expect(resBody.statusCode).toBe(200);
});


test('Sending User Query', async () => {
  const resBody = await request(app).post('/contact').send({
    names: `QWERTY ${randomString(5)}`,
    email: `abudd${randomString(5)}@gmail.com`,
    subject: "MNBVCXZLKJHGFDSA",
    message: "qwetryuykjbkjabchkabdskhvcahjd,vclkhjdvc,jhsdvc."
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
    email: "deal@som.net",
    password: "Dealwent500",
  })
  expect(resBody.statusCode).toBe(200);
});


test("User Signup", async () => {
  const resBody = await request(app)
    .post("/signup")
    .set("Authorization", process.env.AUTHKEY)
    .send({
      name: `Cyber${randomString(5)}Punk`,
      email: `cyber${randomString(5)}@gmail.com`,
      password: "andela1234",
    });
  expect(resBody.statusCode).toBe(200);
});


test('User Signup Already Exists', async () => {
  const resBody = await request(app).post('/signup').send({
    name: "QWERTYQWERTY",
    email: "dollar@tom.net",
    password: "Duiwent8000",
  })
  expect(resBody.statusCode).toBe(409);
});


test('User Signup Error', async () => {
  const resBody = await request(app).post('/signup').send({
    name: "QWERTYQWERTY",
    email: "dollartom.net",
    password: "Duiwent8000",
  })
  expect(resBody.statusCode).toBe(404);
});
