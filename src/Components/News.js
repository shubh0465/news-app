import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        pageSize: 6,
        country: "in",
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
    }
    async updatenews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=68931f2a52b14c7ebd699a6a8fa69e68&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=68931f2a52b14c7ebd699a6a8fa69e68&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        await this.updatenews();
    }
    // handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=68931f2a52b14c7ebd699a6a8fa69e68&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({
    //     //     loading:true
    //     // })
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading:true
    //     // })
    //     await this.setState({
    //         page: this.state.page-1
    //     });
    //     await this.updatenews();
    // }
    // handleNextClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=68931f2a52b14c7ebd699a6a8fa69e68&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({
    //     //     loading:true
    //     // })
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json()
    //     // this.setState({
    //     //     page: this.state.page + 1,
    //     //     articles: parsedData.articles,
    //     //     loading:false
    //     // })
    //     await this.setState({
    //         page: this.state.page+1
    //     });
    //     await this.updatenews();
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=68931f2a52b14c7ebd699a6a8fa69e68&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    };

    render() {
        return (
            <>
                <h2 className="mb-3 text-center">{this.capitalizeFirstLetter(this.props.category)}-Top Headlines</h2>
                {/* {this.state.loading && <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>} */}
                {this.state.loading && <h4 className="text-center">loading...</h4>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    // loader={<div className="d-flex justify-content-center">
                    //     <div className="spinner-border" role="status">
                    //         <span className="sr-only"></span>
                    //     </div></div>}
                    loader={<h4 className="text-center">loading...</h4>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title:""} 
                                description={element.description? element.description: ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}


export default News
