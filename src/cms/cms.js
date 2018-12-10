import CMS from 'netlify-cms'
import './cms.css'
import React from 'react'
import renderToString from 'react-dom/server'

import { Template } from '../templates/example'

class CSSInjector extends React.Component {
  render() {
    return (
      <div
        ref={ref => {
          if (ref && !this.css) {
            this.css = renderToString(this.props.children)
            ref.ownerDocument.head.innerHTML += this.css
          }
        }}
      >
        {React.Children.only(this.props.children)}
      </div>
    )
  }
}

CMS.registerPreviewTemplate('blog', props => (
  <CSSInjector>
    <Template {...props} />
  </CSSInjector>
))
