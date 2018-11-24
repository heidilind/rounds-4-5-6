const initialNotification = 'Give a vote for your favourite anecdote!'

const notificationReducer = (state = initialNotification, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'RESET_NOTIFICATION':
      return initialNotification
    default:
      return state
  }
}

export const setNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification
    })
    setTimeout(() => {
      dispatch(resetNotification())
    }, delay*1000)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}


export default notificationReducer