'use strict'

import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {setSize} from 'Redux/actions'
import StringContent from './components/StringContent'

require('./index.scss')

class KeyContent extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const props = {key: this.props.keyName, ...this.props}
    let view
    if (this.props.objectDocument) {
      view = <StringContent {...props}/>
    } else {
      view = (<div className="notfound">
        <span className="icon icon-trash"/>
        <p>The key has been deleted</p>
      </div>)
    }
    return <div style={this.props.style} className="BaseContent">{ view }</div>
  }
}

function mapStateToProps(state) {
  return {
    contentBarWidth: state.sizes.get('contentBarWidth') || 200,
    scoreBarWidth: state.sizes.get('scoreBarWidth') || 60,
    indexBarWidth: state.sizes.get('indexBarWidth') || 60
  }
}

const mapDispatchToProps = {
  setSize
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyContent)
