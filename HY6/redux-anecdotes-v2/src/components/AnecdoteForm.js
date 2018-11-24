import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import { setCreated } from './../reducers/flagReducer'
import connect from 'react-redux/lib/connect/connect'
import Footer from './Footer'

class AnecdoteForm extends React.Component {
  
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.anecdoteCreation(content)
    this.props.setCreated() 
    this.props.setNotification(`a new anecdote "${content}" created!`, 5)
  }

  render() {
    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={this.handleSubmit}>
        <div><input name='anecdote'/></div>
        <button>create</button> 
      </form>
      <Footer />
    </div>
    )
  }
}


export default connect(
  null, { anecdoteCreation, setNotification, setCreated }
)(AnecdoteForm)
