const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
})

test('the first note is about vim', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('Neovim is cool')
})

afterAll(async () => {
  await mongoose.connection.close()
})
