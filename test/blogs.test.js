import app from '../index';
import request from 'supertest';

// test('Create a Blog', async () => {
//   const reqBody = await (await request(app).post('/api/blogs')).set("Authorization", authKey).send({
//     title: "POUYTREWQ",
//     image: "adsfgvhbnjsbvkhzjvbksvvshvdbsdjbv,,sdvbsdvhbskhdvbkhs",
//     content: "Qbkdchvkhdcvmhvavdcykhvcwyvhcwychvbhcwvhcjwyhcvjwhjhwv",
//   })
//   expect(reqBody.statusCode).toBe(200);
// });


test('Getting All The Blogs', async () => {
  const reqBody = await request(app).get('/api/blogs').send()
  expect(reqBody.statusCode).toBe(200);
});
