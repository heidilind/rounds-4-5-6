const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/list_helper')

const initialBlogs = [
	{
		title: 'New York',
		author: 'minna',
		url: 'www.newyork.com',
		likes: 987
	},
	{
		title: 'traveling around the world',
		author: 'heidi',
		url: 'www.bestravelblog.com',
		likes: 101343
	}
]

beforeAll(async () => {
  await Blog.remove({})
  console.log('cleared')

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('done')
  
})


describe('when there is initially one user at db', async () => {
	beforeAll(async () => {
	  await User.remove({})
	  const user = new User({ username: 'root', password: 'sekret' })
	  await user.save()
	})
  
	test('POST /api/users succeeds with a fresh username', async () => {
	  const usersBeforeOperation = await helper.usersInDb()
	  const freshUserName = 'maija'
	  await api
		.post('/api/users')
		.send({
			username: freshUserName,
			name: 'Maija Mäkinen',
			password: 'salasana',
			adult: true
		  })
		.expect(200)
		.expect('Content-Type', /application\/json/)
  
	  const usersAfterOperation = await helper.usersInDb()
	  expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
	  const usernames = usersAfterOperation.map(u=>u.username)
	  expect(usernames).toContain(freshUserName)
	})

	test('POST /api/users unsucceeds with a existing username', async () => {
		const usersBeforeOperation = await helper.usersInDb()
		const existing = 'root'
		await api
		  .post('/api/users')
		  .send({
			username: existing,
			name: 'Maija Mäkine',
			password: 'salasana',
			adult: false
		  })
		  .expect(400)
		  .expect('Content-Type', /application\/json/)
	
		const usersAfterOperation = await helper.usersInDb()
		expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
		const usernames = usersAfterOperation.map(u=>u.username)
		expect(usernames).toContain(existing)
	  })

	  test('POST /api/users unsucceeds with a too short password', async () => {
		const usersBeforeOperation = await helper.usersInDb()
		await api
		  .post('/api/users')
		  .send({
			username: 'maija',
			name: 'Maija Mäkinen',
			password: 'salasana'
		  })
		  .expect(400)
		  .expect('Content-Type', /application\/json/)
	
		const usersAfterOperation = await helper.usersInDb()
		expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
	  })

	  test('default value for adultness is true', async () => {
		const usersBeforeOperation = await helper.usersInDb()
		
		await api
		  .post('/api/users')
		  .send({
			  username: 'matti',
			  name: 'Matti Mäkinen',
			  password: 'salasana'
			})
		  .expect(200)
		  .expect('Content-Type', /application\/json/)
	
		const usersAfterOperation = await helper.usersInDb()
		const matti = usersAfterOperation.filter(u=>u.username=='matti')
		expect(matti[0].adult).toBe(true)
	  })
	  
  })


describe('when there is initially some blogs saved', async () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
})

describe('addition of a new blog', async () => {
	const users = await helper.usersInDb()
		
	const newBlog = {
		"title": "new fancy blog",
		"author": "fancy blogger",
		"url": "www.fancyblogger.com",
		"userId": users[0]._id
	}

	test('posted blog will be added', async () => {	 
		const blogsBefore = await helper.blogsInDb()
	 
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	
		const blogsAfter = await helper.blogsInDb()
	
		expect(blogsAfter.length).toBe(blogsBefore.length+1)
		expect(blogsAfter.filter(blog => blog.title === "new fancy blog").length).toBe(1)		
	})

	test('likes are 0 for posted blog without a value of likes-field', async () => {
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
		
		const blogsAfter = await helper.blogsInDb()
		const added = blogsAfter.filter(blog => blog.title === "new blog title")
		expect(added[0].author).toBe('blogger')
	})

	test('posts without title or url not added', async () => {
		const badBlog = { "author": "new blogger"}
		await api
			.post('/api/blogs')		
			.send(badBlog)
			.expect(400)
	})
})

afterAll(() => {
  server.close()
})
