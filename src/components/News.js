import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const capitalizeFirstLetter = (string) => {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  };


const updateNews = async () => {
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=79b6c29b0be748c7b54b83539d3fd38f&page=1&pageSize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  props.setProgress(40);
  let parsedData = await data.json();
  props.setProgress(70);
  console.log(parsedData);

  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  props.setProgress(100);
};

useEffect(() => {  
  document.title = `NewsMonkey-${capitalizeFirstLetter(props.category)}`;
  updateNews();
}, []);

// const handlePreviousClick = async () => {
//   setPage(page - 1);
//   updateNews();
// };

// const handleNextClick = async () => {
//   setPage(page + 1);
//   updateNews();
// };

const fetchMoreData = async () => {
  // setPage(page + 1);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=79b6c29b0be748c7b54b83539d3fd38f&page=1&page=${page+1}&pageSize=${props.pageSize}`;
  //  this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  setArticles(articles.concat(parsedData.articles));
  setTotalResults(parsedData.totalResults);
};

return (
  <>
    <h1 className="text-center" style={{ margin: "40px 0px", marginTop: "90px"}}>
      NewsMonkey- Top {capitalizeFirstLetter(props.category)} Headlines
    </h1>

    {loading && <Spinner />}
    {/* if this.state.loading is true then show spinner otherwise do not show spinner */}

    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner />}
    >
      <div className="container">
        <div className="row">
          {articles &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </InfiniteScroll>

    {/* <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-4" onClick={this.handlePreviousClick}>&larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/props.pageSize)} type="button" className="btn btn-dark my-4" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
  </>
);
};

News.defaultProps = {
  country: "in",
  pagesize: 9,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
