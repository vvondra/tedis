'use strict'

import React from 'react'

class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
      collections: [],
      keys: 0
    }
  }

  componentDidMount() {
    this.updateCollections()
    this.updateInfo(this.props.collection)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collection !== this.props.collection) {
      this.updateInfo(nextProps.collection)
    }
  }

  updateCollections() {
    this.props.redis.keys('*', (err, res) => {
      if (!err & res.length > 0) {
        this.setState({collections: res})
        this.props.onDatabaseChange(res[0])
      }
    })
  }

  updateInfo(collection) {
    if (!collection) {
      return;
    }
    this.props.redis.send_command('stats', [collection], (err, res) => {
      if (!err) {
        let info = res[0];
        for (let i = 0; i < info.length; i = i + 2) {
          if (info[i] === 'num_objects') {
            this.setState({ keys: info[i + 1] });
            break;
          }
        }
      }
    })
  }

  componentWillUnmount() {
    this.interval = null
  }

  handleChange(evt) {
    const collection = evt.target.value;
    this.props.onDatabaseChange(collection)
  }

  render() {
    return (<footer className="toolbar toolbar-footer">
      <span style={{marginLeft: 6}}>Objects: {this.state.keys}</span>
      <div style={{float: 'right'}}>
        <span>Collection/Key:</span>
        <select
          onChange={this.handleChange.bind(this)}
          value={this.props.collection || ''} className="form-control" style={{
            width: 100,
            marginTop: 2,
            marginRight: 2,
            marginLeft: 3,
            fontSize: 10,
            float: 'right'
          }}
                                                         >
          {
          (collections => {
            const items = []
            for (let i = 0; i < collections.length; i++) {
              items.push(
                <option key={collections[i]} value={collections[i]}>{collections[i]}</option>
              )
            }
            return items
          })(this.state.collections)
        }
        </select>
      </div>
    </footer>)
  }
}

export default Footer
