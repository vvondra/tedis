'use strict'

import React from 'react'
import Editor from './Editor'

class GeoJSONContent extends React.Component {
  constructor() {
    super()
    this.state = {
      buffer: Buffer.alloc(0)
    }
  }

  init(objectDocument) {
    this.setState({
      buffer: new Buffer(JSON.stringify(objectDocument))
    })
  }

  componentDidMount() {
    this.init(this.props.objectDocument)
  }

  componentDidUpdate() {
    if (typeof this.state.scrollToRow === 'number') {
      this.setState({scrollToRow: null})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyName !== this.props.keyName) {
      this.init(nextProps.objectDocument)
    }
  }

  componentWillUnmount() {
    this.setState = function () {}
  }

  save(value, callback) {
    if (this.state.keyName) {
      this.props.redis.setKeepTTL(this.state.keyName, value, (err, res) => {
        this.props.onKeyContentChange()
        callback(err, res)
      })
    } else {
      alert('Please wait for data been loaded before saving.')
    }
  }

  create() {
    return this.props.redis.set(this.state.keyName, '')
  }

  render() {
    return (<Editor
      buffer={this.state.buffer}
      onSave={this.save.bind(this)}
      />)
  }
}

export default GeoJSONContent
