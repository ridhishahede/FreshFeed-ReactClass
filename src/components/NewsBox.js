import React, { Component } from 'react'

export class NewsBox extends Component {
  render() {
    let {title, description, imageURL} = this.props;
    return (
      <div className='my-3 mx-3'>
        <div className="card" style={{width: "18rem"}}>
          <img src={imageURL} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href="/newsdetails/" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsBox
