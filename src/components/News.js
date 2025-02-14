import React, { Component, createRef } from "react";
import NewsItems from "./NewsItems";
import { useParams } from "react-router-dom";

function withRouter(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    this.loaderRef = createRef(); 
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async fetchNews(category, page) {
    this.setState({ loading: true });

    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=6`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState((prevState) => ({
      articles: [...prevState.articles, ...(parsedData.articles || [])], 
      totalResults: parsedData.totalResults || 0,
      loading: false,
    }));

    document.title = `${this.capitalizeFirstLetter(category)} - NewsApp`;
  }

  componentDidMount() {
    const category = this.props.params.category || "general";
    this.fetchNews(category, this.state.page);
    this.loadNews();


    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.state.loading) {
          this.loadMore();
        }
      },
      { threshold: 1 }
    );

    if (this.loaderRef.current) {
      this.observer.observe(this.loaderRef.current);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.category !== this.props.params.category) {
      this.setState({ page: 1, articles: [] }, () => {
        this.fetchNews(this.props.params.category || "general", 1);
      });
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  loadMore = () => {
    if (this.state.articles.length < this.state.totalResults) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        () => this.fetchNews(this.props.params.category || "general", this.state.page)
      );
    }
  };

  loadNews = async () => {
    this.props.setProgress(20); 
    
    setTimeout(() => {
      this.props.setProgress(50);
    }, 500);
    
    setTimeout(() => {
      this.props.setProgress(100); 
    }, 1500);
  };

  render() {
    const category = this.props.params.category || "general";

    return (
      <div className="container my-3">
        <h1 className="text-center">Top {this.capitalizeFirstLetter(category)} News</h1>

        <div className="row">
          {this.state.articles.map((element, index) => (
            <div className="col-md-4" key={index}>
              <NewsItems
                title={element.title || "No Title"}
                description={element.description || "No Description"}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author || "No Author"}
                date={element.publishedAt || "null"}
                source={element.source.name}
              />
            </div>
          ))}
        </div>

        <div ref={this.loaderRef} className="text-center my-3">
          {this.state.loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(News);
