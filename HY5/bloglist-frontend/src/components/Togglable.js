import React from 'react'
import BlogOpen from './BlogOpen'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    if (this.props.isBlog) {
      return(
        <div style={blogStyle}>
          <div style={showWhenVisible} className='partialContent'>
            <div onClick={this.toggleVisibility} className='blogTitle'>
              {this.props.blog.title}, {this.props.blog.author}
            </div>
          </div>
          <div style={hideWhenVisible} className='allContent'>
            <BlogOpen
              close={this.toggleVisibility} 
              blog={this.props.blog} 
              like={this.props.likeUpdate}
              deleteBlog={this.props.deleteBlog}
              />
          </div>
        </div>
      )
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
      
    )
  }
}

export default Togglable