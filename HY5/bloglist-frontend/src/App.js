import React from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/loginService'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      message: null,
      userToken: '',
      newAuthor: '',
      newTitle: '',
      newUrl: '',
      createVisible: true
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const name = user.name
      const token = user.token
      this.setState({user: name, userToken: token})
      blogService.setToken(user.token)
    }
    
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ 
        username: '', 
        password: '', 
        user: user.name, 
        userToken: user.token
      })
    } catch(exception) {
      this.setState({
        message: 'unvalid username or password',
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  logOut = async (event) => {
    window.localStorage.clear()
    this.setState({
      username: '', 
      password: '',   
      user: null, 
      userToken: '',
      message: 'Succesfully logged out'
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl,
      user: this.state.user
    }
    blogService
      .create(blog)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newTitle: '',
          newAuthor: '',
          newUrl: '',
          message: `a new blog '${newBlog.title}' added`
        }) 
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      }).catch(er => {
        console.log(er)
      })    
  }

  updateBlog = (blogId, title, author, likes, url, user) => (event) => {
    const updatedLikes = likes + 1
    const blog = {
      title: title,
      author: author,
      likes: updatedLikes,
      url: url,
      user: user
    }
    
    blogService
      .update(blogId, blog)
      .then(updated => {
        updated.id = updated._id
        const i = this.state.blogs.findIndex(blog => blog.id === updated.id)
        const newBlogs = this.state.blogs
        if (i === -1) {
          newBlogs.push(updated)
        } else {
          newBlogs[i] = updated
        }
        
        this.setState({blogs: newBlogs})
      }).catch(er => {
        console.log(er)
      })  
  }

  deleteBlog = (blog, token) => (event) => {
    window.confirm(`Poistetaanko ${blog.title}?`) &&
    blogService
      .deleteB(blog.id, blog.user.username, token) 
      .then(result => {
        const newBlogs = this.state.blogs.filter(b => b.id !== blog.id)        
        this.setState({blogs: newBlogs, message: `"${blog.title}" deleted`})
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      }).catch(er => {
        console.log(er)
      })
  }

  handleFieldChange =  (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  sortBlogs = (a, b) => b.likes - a.likes

  render() {

    const createForm = () => {
      return(
        <Togglable buttonLabel="create new" isBlog={false}>
          <CreateForm
            author={this.state.newAuthor}
            title={this.state.newTitle}
            url={this.state.newUrl}
            handleChange={this.handleFieldChange}
            handleSubmit={this.addBlog}
          />
        </Togglable>
      )
    }
  
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.message} />
          <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleFieldChange}
              handleSubmit={this.login}
            />
        </div>
      )
    }
    return (
      <div>
        <Notification message={this.state.message} />
        <h2>blogs</h2>
        <UserInfo user={this.state.user} logout={this.logOut} />
        {this.state.blogs.sort(this.sortBlogs).map((blog, k) => 
          <Togglable 
            key={k}
            isBlog={true} 
            blog={blog}
            likeUpdate={this.updateBlog(
              blog.id, blog.title, blog.author, blog.likes, blog.url, blog.user
            )}
            deleteBlog={this.deleteBlog(blog, this.state.userToken)}
            />
        )}
        { createForm() }
      </div>
    );
  }
}

export default App;
