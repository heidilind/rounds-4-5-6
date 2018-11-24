import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { setNotification, resetNotification } from './../reducers/notificationReducer'
import { unsetCreated } from './../reducers/flagReducer'
import connect from 'react-redux/lib/connect/connect'
import Filter from './Filter'
import Notification from './Notification'
import Footer from './Footer'
import { Link } from 'react-router-dom'


const AnecdoteList = (props) => {
  
  const vote = async (a) => {
    props.anecdoteVote({
      content: a.content,
      id: a.id,
      votes: a.votes + 1
    })
  }

  props.unsetCreated()
  
  return (
    <div>

      <h2>Anecdotes</h2>
      <Notification />
      { props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            <Link to ={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </div>
          <div>
            votes: {anecdote.votes}
            <button onClick={() => {
              vote(anecdote)
              props.setNotification(`you voted: ${anecdote.content} `, 5)
            }}>vote</button>
          </div>
        </div>
      )}
      <Filter />
      <Footer />
    </div>
  )
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => 
    a.content.toUpperCase().includes(filter.toUpperCase().trim())
  )
} 

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}
 
const ConnectedList = connect(
    mapStateToProps, { 
      anecdoteVote, setNotification, 
      resetNotification, unsetCreated 
    }
  )(AnecdoteList)

export default ConnectedList
