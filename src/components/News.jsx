import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
    let category = props.category;
    let [articles, setArticles] = useState([]);
    let [totalResults, setTotalResults] = useState(0);
    let [page, setPage] = useState(1);

    let resultNews = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
        const apiKey = process.env.VITE_API_KEY;

        // const url = `https://newsapi.org/v2/everything?q=${category}&page=${page}&apiKey=${apiKey}`;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=${apiKey}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
    };

    useEffect(() => {
        resultNews();
    }, []);

    let fetchData = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page + 1}&apiKey=cbb017c5542c4fa8aa6a86109129fe71`;
        // const url = `https://newsapi.org/v2/everything?q=${category}&page=${page + 1}&apiKey=${apiKey}`;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page + 1}&apiKey=${apiKey}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
    };

    return (
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchData}
            hasMore={articles.length < totalResults}
            loader={<h4 className="text-center">Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="container my-3">
                <div className="row">
                    {articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem
                                sourceName={element.source.name}
                                title={element.title}
                                desc={element.description}
                                imageURL={element.urlToImage ? element.urlToImage : "/Images/News1.jpg"}
                                newsUrl={element.url}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </InfiniteScroll>
    );
}

export default News;
