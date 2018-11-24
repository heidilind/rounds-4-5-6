import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import flagReducer from './reducers/flagReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
    createdFlag: flagReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store