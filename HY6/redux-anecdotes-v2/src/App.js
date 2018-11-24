import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import { anecdotesInitialization } from './reducers/anecdoteReducer' 
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

class App extends React.Component {
  componentDidMount = async () => {
    this.props.anecdotesInitialization()
    console.log(this.props)
  }

  render() {
    const anecdoteById = (id) => 
      this.props.anecdotes.find(a => a.id === id)
      
    return (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">anecdotes</Link> &nbsp;
              <Link to="/form">create new</Link> &nbsp;
            </div>
            <Route exact path="/" render={() => <AnecdoteList />} />
            <Route path="/form" render={() => 
              this.props.createdFlag
                ? <Redirect to='/'/>
                : <AnecdoteForm />                            
            } />
            <Route exact path="/anecdotes/:id" render={ ({match}) =>
              <Anecdote anecdote={anecdoteById(match.params.id)} />
            }/>
          </div>
        </Router>  
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    createdFlag: state.createdFlag
  }
}
 

export default connect(
  mapStateToProps,
  { anecdotesInitialization }
)(App)

