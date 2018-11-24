import React from 'react'

const CreateForm = ({ handleSubmit, handleChange, title, author, url }) => {
    return (
        <form onSubmit={handleSubmit}>
          <h2>create new</h2>
          <div>
            title
            <input
              type="text"
              name="newTitle"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="newAuthor"
              value={author}
              onChange={handleChange}
            />
          </div>
          <div>
            url
            <input
              type="url"
              name="newUrl"
              value={url}
              onChange={handleChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
    )
  }

export default CreateForm