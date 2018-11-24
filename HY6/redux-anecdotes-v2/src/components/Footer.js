import React from 'react'

class Footer extends React.Component {
  
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        Anecdote app for 
        <a href="https://fullstackopen.github.io/">Full Stack Sovelluskehitys</a>. 
        See 
        <a href="https://github.com/FullStack-HY/">https://github.com/FullStack-HY/</a> 
        for the source code.
      </div>
    )
  }
}

export default Footer
