import React from 'react'
import { shallow } from 'enzyme'
import Togglable from './Togglable'

describe('<Togglable />', () => {

    let togglableComponent

    beforeEach(() => {
      togglableComponent = shallow(
        <Togglable 
          isBlog={true} 
          blog={{
              title: 'Test blog',
              author: 'test author',
              likes: 100
          }}>
          <div className="testDiv" />
        </Togglable>
      )
    })

  it('at first all the content of the blog is not shown', () => {
    const div = togglableComponent.find('.allContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })

  })

  it('after a click all the content of the blog is shown instead of the partial content', () => {
    const nameDiv = togglableComponent.find('.blogTitle')
    nameDiv.simulate('click')

    const contentDiv = togglableComponent.find('.partialContent') 
    expect(contentDiv.getElement().props.style).toEqual({ display: 'none' })

  })
  

})