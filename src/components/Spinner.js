import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <button class="btn btn-dark" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
        </button>
      </div>
    )
  }
}

export default Spinner
