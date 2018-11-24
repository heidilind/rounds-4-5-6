import anecdoteService from '../services/anecdotes'

const anecdotesReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const old = state.filter(a => a.id !==action.id)
      const voted = state.find(a => a.id === action.id)
      return [...old, { ...voted, votes: voted.votes+1}]
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.updateVotes(anecdote)
    dispatch({ 
      type: 'VOTE', 
      id: updated.id })
  }
}

export const anecdotesInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdotesReducer