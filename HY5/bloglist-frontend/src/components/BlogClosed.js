import React from 'react'
import PropTypes from 'prop-types'

const BlogClosed = ({title, author, open}) => (
  <div onClick={open}>
     {title}, {author}
  </div>  
)

BlogClosed.propTypes = {
  title: PropTypes.string.isRequired
}

export default BlogClosed
