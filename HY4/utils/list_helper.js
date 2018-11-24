const Blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
		const likes = blog.likes
    return sum + likes
  }

  return blogs.reduce(reducer, 0) 
}

const mostLikes = (blogs) => {
  const reducer = (biggest, blog) => {
		return blog.likes > biggest.likes ? blog : biggest
  }
	
	const favoriteBlogger = blogs.reduce(reducer, {likes: 0})
	const author = favoriteBlogger.author
	const likes = totalLikes(blogs.filter(blog => blog.author === author))
	return ({author, likes})
}

const mostBlogs = (blogs) => {	
	const authorsBlog = (author) => blogs.filter(blog => blog.author === author).length
	const reducer = (bestBlog, blog) => {
		return authorsBlog(blog) < authorsBlog(bestBlog) ? bestBlog: blog 
	}

	const mostProductive = blogs.reduce(reducer, {author: 'nobody'}).author
	const amount = authorsBlog(mostProductive)
	return ({author: mostProductive, blogs: amount})
}

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
		url: blog.url,
    id: blog._id
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}


const usersInDb = async () => {
	const users = await User.find({})
	return users
}

module.exports = {
  dummy,
	totalLikes,
	mostLikes,
	mostBlogs,
	blogsInDb,
	usersInDb
}
