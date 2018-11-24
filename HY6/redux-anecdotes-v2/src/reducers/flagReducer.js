
const flagReducer = (state = false, action) => {
    switch (action.type) {
    case 'SET_CREATED':
      return true
    case 'UNSET_CREATED':
      return false
    default:
      return state
  }
}

export const setCreated = () => {
  return async (dispatch) => {
    dispatch({ type: 'SET_CREATED' })
  }
}

export const unsetCreated = () => {
  return async (dispatch) => {
    dispatch({ type: 'UNSET_CREATED' })
  }
}


export default flagReducer