import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import Togglable from './components/Togglable';

describe.only('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders all blogs it gets from backend', () => {
    app.update()
    const login = app.find(LoginForm)
    const togglables = app.find(Togglable)
    expect(login.length).toEqual(1)
    expect(togglables.length).toEqual(0)
  })

})
