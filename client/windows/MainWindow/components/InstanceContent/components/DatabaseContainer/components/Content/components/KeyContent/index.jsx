'use strict'

import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {setSize} from 'Redux/actions'
import Editor from './components/Editor'
import { Map, GeoJSON, TileLayer } from 'react-leaflet';

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

require('./index.scss')
require('leaflet/dist/leaflet.css')

class KeyContent extends PureComponent {
  constructor() {
    super()
    this.state = {
       buffer: Buffer.alloc(0)
    }
  }

  init(objectDocument) {
    if (!objectDocument) {
      return;
    }
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
    if (nextProps.objectDocument !== this.props.objectDocument) {
      this.init(nextProps.objectDocument)
    }
  }

  componentWillUnmount() {
    this.setState = function () {}
  }

  render() {
    const position = [51.505, -0.09];
    const props = {key: this.props.keyName, ...this.props}

    let accessToken = 'pk.eyJ1IjoidnZvbmRyYSIsImEiOiJjajQ3NTZtajQwMTJtMzNxcWR5YXA3eGsyIn0.upVtttpfFBwd5IlbnZkPkQ'
    let tileUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=' + accessToken
    let tileAttribution = '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/feedback/" target="_blank">Improve this map</a></strong>'
    //  tileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    //  tileAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

    if (this.props.objectDocument) {
      return <div style={this.props.style} className="Content">
        <Editor buffer={this.state.buffer} />
        <Map center={position} zoom={13}>
          <TileLayer
            url={tileUrl}
            attribution={tileAttribution}
          />
          <GeoJSON data={this.props.objectDocument} />
        </Map>
      </div>
    } else {
      return <div style={this.props.style} className="Content">
        <div className="notfound">
          <span className="icon icon-trash"/>
          <p>The key has been deleted</p>
        </div>
      </div>
    }
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
