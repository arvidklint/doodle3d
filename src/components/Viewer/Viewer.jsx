import React, { Component } from 'react'

import styles from './Viewer.css'

import View from '../../modules/view/View'

class Viewer extends Component {
  componentDidMount() {
    this.view = new View(this.canvas)
    this.view.run()
  }

  render() {
    return (
      <canvas
        ref={(c) => { this.canvas = c }}
        className={styles.canvas}
        width={window.innerWidth}
        height={window.innerHeight}
      >
      </canvas>
    )
  }
}

export default Viewer
