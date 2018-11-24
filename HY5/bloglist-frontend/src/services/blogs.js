import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteB = (id, user, paramToken) => {
  const destUrl = `${baseUrl}/${id}`
  const requesterToken = `bearer ${paramToken}` 
  const config = {
    headers: { 'Authorization': token }
  }

  if (typeof user === 'undefined') {
    return axios.delete(destUrl, config)
  }

  if (requesterToken === token) {
    return axios.delete(destUrl, config)
  }

  return Promise.reject(new Error('not permitted'))

}

export default { getAll, setToken, create, update, deleteB }