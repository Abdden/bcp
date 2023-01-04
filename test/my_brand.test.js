import app from '../index.js';
import request from 'supertest';
import Blog from '../models/Blog';
import { imgURI, randomString } from '../uri.js';


// const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlmYTc0NjQyZjA2NGEyMmUwYmEzNjAiLCJpYXQiOjE2NzE3OTg2NjN9.4oA5WOfkiDfeo1Pz5KTDLaEleq2ZV2Ij1DdNEaptP2Q"

const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FhY2Q1NzYwZTk3Njk3ZmMwNWUyZWEiLCJlbWFpbCI6ImNtcHVua0BqYWlsLm5ldCIsIm5hbWUiOiJDTVBVTksiLCJpYXQiOjE2NzI2NjY5NTN9.6IV_-qdcn1td9XcWFKYTusdkb-wOAqpzy0OR6xSfk14"


test('Getting Signed Up Users', async () => {
  const resBody = await request(app).get('/api/signup').set("Authorization", authKey).send()
  expect(resBody.statusCode).toBe(200);
});


test('Admin Sign Up', async () => {
  const resBody = await request(app).post('/api/signup/admin').set("Authorization", authKey).send({
    name: `Cyber${randomString(5)}Punk`,
    email: `cyber${randomString(5)}@gmail.com`,
    password: "adminandela12345",
  })
  expect(resBody.statusCode).toBe(200);
});


test('Getting All The Blogs', async () => {
  const resBody = await request(app).get('/api/blogs').send()
  expect(resBody.statusCode).toBe(200);
});


test('Posting a Blog', async () => {
  const resBody = await request(app).post('/api/blogs').set('Authorization', authKey).send({
    title: `QWERTY ${randomString(5)} mbvmvbmdj`,
    image: imgURI,
    content: "gDNGDJDJDGDNGDNGDMHDMDMDMDDMDHDDMDMDMDDDYDHDYDHMDHMYDYD"
  })
  expect(resBody.statusCode).toBe(200);
});


test('Liking a Blog', async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).post('/api/blogs/' + id + '/stats').set('Authorization', authKey).send()
  expect(resBody.statusCode).toBe(200);
});


test('Updating a Blog', async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).put('/api/blogs/' + id).set('Authorization', authKey).send({
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
    .get("/api/blogs/" + id)
    .send();
  expect(resBody.statusCode).toBe(200);
});


test("Getting Single Blog Comments", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app)
    .get("/api/blogs/" + id + "/comments")
    .send();
  expect(resBody.statusCode).toBe(200);
});


test("Commenting On Blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const resBody = await request(app).post("/api/blogs/" + id + "/comments").set("Authorization", authKey).send({
      comment: `Something crazy ${randomString(5)} making this whole thing fail...`,
    })
  expect(resBody.statusCode).toBe(200);
});


test('Sending User Query', async () => {
  const resBody = await request(app).post('/api/contact').send({
    names: `QWERTY ${randomString(5)}`,
    email: `abudd${randomString(5)}@gmail.com`,
    subject: "MNBVCXZLKJHGFDSA",
    message: "qwetryuykjbkjabchkabdskhvcahjd,vclkhjdvc,jhsdvc."
  })
  expect(resBody.statusCode).toBe(200);
});


test('View User Queries', async () => {
  const resBody = await request(app).get('/api/contacts').set("Authorization", authKey).send()
  expect(resBody.statusCode).toBe(200);
});


test('User Login', async () => {
  const resBody = await request(app).post('/api/login').send({
    email: "deal@som.net",
    password: "Dealwent500",
  })
  expect(resBody.statusCode).toBe(200);
});


test("User Signup", async () => {
  const resBody = await request(app)
    .post("/api/signup")
    .set("Authorization", authKey)
    .send({
      name: `Cyber${randomString(5)}Punk`,
      email: `cyber${randomString(5)}@gmail.com`,
      password: "andela1234",
    });
  expect(resBody.statusCode).toBe(200);
});


test('User Signup Already Exists', async () => {
  const resBody = await request(app).post('/api/signup').send({
    name: "QWERTYQWERTY",
    email: "dollar@tom.net",
    password: "Duiwent8000",
  })
  expect(resBody.statusCode).toBe(409);
});


test('User Signup Error', async () => {
  const resBody = await request(app).post('/api/signup').send({
    name: "QWERTYQWERTY",
    email: "dollartom.net",
    password: "Duiwent8000",
  })
  expect(resBody.statusCode).toBe(404);
});
