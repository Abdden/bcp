import app from '../index';
import request from 'supertest';
import Blog from '../models/Blog';
import { imgURI, randomString } from '../uri.js';

const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlmYTc0NjQyZjA2NGEyMmUwYmEzNjAiLCJpYXQiOjE2NzE3OTg2NjN9.4oA5WOfkiDfeo1Pz5KTDLaEleq2ZV2Ij1DdNEaptP2Q"
// const authKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzlmYTc0NjQyZjA2NGEyMmUwYmEzNjAiLCJpYXQiOjE2NzIwNTU1ODJ9.XsAy9ROxSgarRJLg72Yl2qvGGdgyUftnOJ7Xo5pnZl8"

// describe('App Request', (done) => {
//   test('should responds with 200', async (done) => {
//     const result = await request(app).get('/api/blogs');
//     expect(result.status).toBe(200);
//     done();
//   });
// });

test('Getting Signed Up Users', async () => {
  const reqBody = await request(app).get('/api/signup').set("Authorization", authKey).send()
  expect(reqBody.statusCode).toBe(200);
});

test('Getting All The Blogs', async () => {
  const reqBody = await request(app).get('/api/blogs').send()
  expect(reqBody.statusCode).toBe(200);
});

test('Posting a Blog', async () => {
  const reqBody = await request(app).post('/api/blogs').set('Authorization', authKey).send({
    title: `QWERTY ${randomString(5)} mbvmvbmdj`,
    image: imgURI,
    content: "gDNGDJDJDGDNGDNGDMHDMDMDMDDMDHDDMDMDMDDDYDHDYDHMDHMYDYD"
  })
  expect(reqBody.statusCode).toBe(200);
});


test("Getting Single Blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/blogs/" + id)
    .send();
  expect(response.statusCode).toBe(200);
});


test("Getting Single Blog Comments", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/blogs/" + id + "/comments")
    .send();
  expect(response.statusCode).toBe(200);
});


test("Commenting On Blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .post("/api/blogs/" + id + "/comments")
    .send({
      comment: `Something crazy ${randomString(5)} making this whole thing fail...`,
    })
    .set("Authorization", authKey);
  expect(response.statusCode).toBe(200);
});


test('Sending User Query', async () => {
  const reqBody = await request(app).post('/api/contact').send({
    names: `QWERTY ${randomString(5)}`,
    email: `abudd${randomString(5)}@gmail.com`,
    subject: "MNBVCXZLKJHGFDSA",
    message: "qwetryuykjbkjabchkabdskhvcahjd,vclkhjdvc,jhsdvc."
  })
  expect(reqBody.statusCode).toBe(200);
});

test('User Login', async () => {
  const reqBody = await request(app).post('/api/login').send({
    email: "deal@som.net",
    password: "Dealwent500",
  })
  expect(reqBody.statusCode).toBe(200);
});


test("User Signup", async () => {
  const response = await request(app)
    .post("/api/signup")
    .set("Authorization", authKey)
    .send({
      name: `Cyber${randomString(5)}Punk`,
      email: `cyber${randomString(5)}@gmail.com`,
      password: "andela1234",
    });
  expect(response.statusCode).toBe(200);
});


test('User Signup', async () => {
  const reqBody = await request(app).post('/api/signup').send({
    name: "QWERTYQWERTY",
    email: "dollar@tom.net",
    password: "Duiwent8000",
  })
  expect(reqBody.statusCode).toBe(409);
});


test('User Signup Error', async () => {
  const reqBody = await request(app).post('/api/signup').send({
    name: "QWERTYQWERTY",
    email: "dollartom.net",
    password: "Duiwent8000",
  })
  expect(reqBody.statusCode).toBe(404);
});

// afterAll(async () => {
// 	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
// });