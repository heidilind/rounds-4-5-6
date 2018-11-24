import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders information of a blog', () => {
    const blog = {
      title: 'Test blog',
      author: 'test author',
      likes: 100
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    const likesDiv = blogComponent.find('.likes')

    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.title)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking the button calls event handler once', () => {
    const blog = {
        title: 'Test blog',
        author: 'test author',
        likes: 100
    }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(3)
  })


})