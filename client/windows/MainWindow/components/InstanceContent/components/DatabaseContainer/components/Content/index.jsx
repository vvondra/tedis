'use strict'

import React from 'react'
import TabBar from './components/TabBar'
import KeyContent from './components/KeyContent'
import Terminal from './components/Terminal'
import Config from './components/Config'
import Footer from './components/Footer'

class Content extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      pattern: '',
      version: 0,
      tab: 'Content'
    }
  }

  init(keyName) {
    this.setState({objectDocument: null})
    if (keyName !== null) {
      this.setState({objectDocument: null})
      this.props.redis.get(this.props.collection, keyName).then(objectDocument => {
        console.log("setting", objectDocument, keyName, this.props.keyName);
        if (keyName === this.props.keyName) {
          this.setState({objectDocument: JSON.parse(objectDocument)})
        }
      })
    }
  }

  componentDidMount() {
    this.init(this.props.keyName)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyName !== this.props.keyName || nextProps.version !== this.props.version) {
      this.init(nextProps.keyName)
    }
    if (nextProps.metaVersion !== this.props.metaVersion) {
      this.setState({version: this.state.version + 1})
    }
  }

  handleTabChange(tab) {
    this.setState({tab})
  }

  render() {
    return (<div className="pane sidebar" style={{height: '100%'}}>
      <TabBar
        onSelectTab={this.handleTabChange.bind(this)}
        />
      <KeyContent
        style={{display: this.state.tab === 'Content' ? 'flex' : 'none'}}
        keyName={this.props.keyName}
        objectDocument={this.state.objectDocument}
        height={this.props.height - 66}
        redis={this.props.redis}
        onKeyContentChange={() => {
          this.setState({version: this.state.version + 1})
        }}
        />
      <Terminal
        style={{display: this.state.tab === 'Terminal' ? 'block' : 'none'}}
        height={this.props.height - 67}
        redis={this.props.redis}
        connectionKey={this.props.connectionKey}
        onDatabaseChange={this.props.onDatabaseChange}
        />
      <Config
        style={{display: this.state.tab === 'Config' ? 'block' : 'none'}}
        height={this.props.height - 67}
        redis={this.props.redis}
        connectionKey={this.props.connectionKey}
        />
      <Footer
        keyName={this.props.keyName}
        objectDocument={this.state.objectDocument}
        version={this.state.version}
        redis={this.props.redis}
        />
    </div>)
  }
}

export default Content
