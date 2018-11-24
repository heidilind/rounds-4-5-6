import React from 'react'
import ReactDOM from 'react-dom'
import countReducer from './reducer'
import {createStore} from 'redux'
import App from './App.js'

const store = createStore(countReducer)


const render = () => {
    ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}

render()
store.subscribe(render)
