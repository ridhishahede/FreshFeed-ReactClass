import React, { Component } from 'react';
import NewsBox from './NewsBox';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    country: 'in',
    category: 'general',
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      total: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category || prevProps.country !== this.props.country) {
      this.fetchArticles(1); 
    }
  }

  fetchArticles = async (page) => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    this.props.setProgress(40);
    const parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      total: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
      page: page,
    });
    this.props.setProgress(100);
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.fetchArticles(this.state.page - 1);
    }
  };

  handleNextClick = async () => {
    if (this.state.page < Math.ceil(this.state.total / this.props.pageSize)) {
      this.fetchArticles(this.state.page + 1);
    }
  };

  handleClick = async (num) => {
    this.fetchArticles(num);
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="my-3 fw-bold">{this.props.pageTitle}</h1>

        {this.state.loading && <Spinner />}

        <div className="row my-4 mx-3">
          {!this.state.loading &&
            this.state.articles.map((ele) => {
              return (
                <div className="col-md-4 p-3" key={ele.url}>
                  <NewsBox
                    title={ele.title}
                    description={ele.description}
                    imageURL={
                      ele.urlToImage
                        ? ele.urlToImage
                        : 'https://c.ndtvimg.com/2023-04/lbf6619o_stock-market_625x300_25_April_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738?ver-20240506.08'
                    }
                    newsUrl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
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
              {[...Array(Math.ceil(this.state.total / this.props.pageSize)).keys()].map((num) => (
                <li className="page-item" key={num + 1}>
                  <button
                    onClick={() => this.handleClick(num + 1)}
                    className={`page-link ${this.state.page === num + 1 ? 'bg-dark text-white' : ''}`}
                  >
                    {num + 1}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  disabled={this.state.page >= Math.ceil(this.state.total / this.props.pageSize)}
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
