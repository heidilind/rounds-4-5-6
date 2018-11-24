import React from 'react'

const UserInfo = ({ user, logout }) => {

  return (
    <div>
        <div className="user_info">{user} logged in</div>
        <div className="user_info"> 
            <button onClick={logout}>log out</button>
        </div>
        <p>{"\n"}</p>
    </div>
  )
  
}

export default UserInfo