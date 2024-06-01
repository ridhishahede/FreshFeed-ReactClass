import React, { Component } from "react";

export class NewsBox extends Component {
  render() {
    //This is how you take in the props as parameters
    let { title, description, imageURL, newsUrl, author, date } = this.props;
    return (
      <div className="my-3 mx-3">
        <div className="card">
          <img src={imageURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small class="text-body-secondary">
                By {author ? author : "Unknown"} at{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-lg btn-dark">
              Know More!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsBox;
