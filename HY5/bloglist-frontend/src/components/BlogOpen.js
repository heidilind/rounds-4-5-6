import React from 'react'

const BlogOpen = ({blog, like, deleteBlog, close}) => (
  <div>
    <div onClick={close}>
      {blog.title}
    </div>
    <div>
      {blog.author}
    </div>
    <div>
      <a href={blog.url}>{blog.url}</a>
    </div>
    <div>
      {blog.likes} likes 
      <button onClick={like}>like</button>
    </div>
    <div>
      added by {blog.user.name}  
    </div>
    <div>
      <button onClick={deleteBlog}>delete</button>
    </div>
  </div>  
)

export default BlogOpen
