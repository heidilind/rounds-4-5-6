
import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <form onSubmit={handleSubmit}>
        <h2>Kirjaudu sovellukseen</h2>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    )
  }

export default LoginForm