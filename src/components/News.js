import React, { Component } from 'react';
import NewsBox from './NewsBox';

export class News extends Component {
  constructor() {
    super();
    // Store the array created in the state to be able to reach out to one state at a time dynamically
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      total: 0,
    };
  }

  async componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  fetchArticles = async (page) => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=24ff48a637f64980aff81181fcfb7cdb&page=${page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      total: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
      page: page,
    });
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.fetchArticles(this.state.page - 1);
    }
  };

  handleNextClick = async () => {
    if (this.state.page < Math.ceil(this.state.total / 20)) {
      this.fetchArticles(this.state.page + 1);
    }
  };

  handleClick = async (num) => {
    this.fetchArticles(num);
  };

  render() {
    return (
      <div className="container my-3">
        <h1>FreshFeed - Top Headlines</h1>

        <div className="row my-4 mx-3">
          {this.state.articles.map((ele) => {
            return (
              <div className="col-md-4 p-3" key={ele.url}>
                <NewsBox
                  title={ele.title}
                  description={ele.description}
                  imageURL={
                    ele.urlToImage
                      ? ele.urlToImage
                      : 'https://images.moneycontrol.com/static-mcnews/2024/02/stocks_nifty-sensex_market.jpg'
                  }
                  newsUrl={ele.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  disabled={this.state.page <= 1}
                  onClick={this.handlePrevClick}
                  className="page-link"
                >
                  &larr; Previous
                </button>
              </li>
              {[...Array(Math.ceil(this.state.total / 20)).keys()].map((num) => (
                <li className="page-item" key={num + 1}>
                  <button
                    onClick={() => this.handleClick(num + 1)}
                    className="page-link"
                  >
                    {num + 1}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  disabled={this.state.page >= Math.ceil(this.state.total / 20)}
                  onClick={this.handleNextClick}
                  className="page-link"
                >
                  Next &rarr;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default News;
