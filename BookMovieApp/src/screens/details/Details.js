import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import YouTube from 'react-youtube';
import {Link} from 'react-router-dom';
import Header from '../../common/header/Header';
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                artists: [],
                genres: [],
                trailer_url: ""
            },
            ratingStarIcons: [
                {
                    id: 1,
                    ratingStarId: "star1",
                    color: "black"
                },
                {
                    id: 2,
                    ratingStarId: "star2",
                    color: "black"
                },
                {
                    id: 3,
                    ratingStarId: "star3",
                    color: "black"
                },
                {
                    id: 4,
                    ratingStarId: "star4",
                    color: "black"
                },
                {
                    id: 5,
                    ratingStarId: "star5",
                    color: "black"
                }
            ]
        }
    }

    componentDidMount() {
        // Fetch movie details-class (artists, genres, trailer_url) and set the value of component state "movie"
        let that = this;
        let movieData = null;
        let movieXHR = new XMLHttpRequest();
        movieXHR.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id);
        movieXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        movieXHR.send(movieData);
        movieXHR.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                that.setState({movie: JSON.parse(this.responseText)});
            }
        });
    }

    // Handler function for star rating
    ratingStarClickHandler = (id) => {
        let ratingStarIconList = [];
        for (let star of this.state.ratingStarIcons) {
            let ratingStarNode = star;
            if (star.id <= id) {ratingStarNode.color = "yellow-rating-color"}
            else {ratingStarNode.color = "black-rating-color";}
            ratingStarIconList.push(ratingStarNode);
        }
        this.setState({ratingStarIcons: ratingStarIconList});
    }

    // Handler function for star rating
    artistImageClickHandler = (profile_url) => {window.location = profile_url;}

    render() {
        let movie = this.state.movie;

        const options = {
            height: '300',
            width: '700',
            playerVars: {autoplay: 1}
        }

        return (
            <div className="details-class">
                <Header id={this.props.match.params.id} baseUrl={this.props.baseUrl} showButtonBookShow="true" />

                <div className="back-link">
                    <Typography>
                        <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>

                <div className="details-flex-container">
                    <div className="details-left">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>

                    <div className="details-middle">
                        <div>
                            <Typography
                                variant="headline"
                                component="h2">{movie.title}
                            </Typography>
                        </div>
                        <div>
                            <Typography>
                                <span className="font-bold">Genres: </span>
                                {movie.genres.join(',')}
                            </Typography>
                        </div>
                        <div>
                            <Typography>
                                <span className="font-bold">Duration:</span>
                                {movie.duration}
                            </Typography>
                        </div>
                        <div>
                            <Typography>
                                <span className="font-bold">Release Date:</span>
                                {new Date(movie.release_date).toDateString()}
                            </Typography>
                        </div>
                        <div>
                            <Typography>
                                <span className="font-bold"> Rating:</span>
                                {movie.rating}
                            </Typography>
                        </div>
                        <div className="margin-top-16">
                            <Typography>
                                <span className="font-bold">Plot:</span>
                                <a href={movie.wiki_url}>(Wiki Link)</a>
                                {movie.storyline}
                            </Typography>
                        </div>
                        <div className="container-trailer">
                            <Typography>
                                <span className="font-bold">Trailer:</span>
                            </Typography>
                            <YouTube
                                onReady={this._onReady}
                                opts={options}
                                videoId={movie.trailer_url.split("?v=")[1]}
                            />
                        </div>
                    </div>

                    <div className="details-right">
                        <Typography>
                            <span className="font-bold">Rate this movie: </span>
                        </Typography>
                        {this.state.ratingStarIcons.map(star => (
                            <StarBorderIcon
                                className={star.color}
                                key={"star" + star.id}
                                onClick={() => this.ratingStarClickHandler(star.id)}
                            />
                        ))}
                        <div className="font-bold margin-bottom-16 margin-top-t16">
                            <Typography>
                                <span className="font-bold">Artists:</span>
                            </Typography>
                        </div>
                        <div className="right-padding">
                            <GridList cellHeight={160} cols={2}>
                                {movie.artists != null && movie.artists.map((artist) => (
                                    <GridListTile
                                        className="tile-grid"
                                        onClick={() => this.artistImageClickHandler(artist.wiki_url)}
                                        key={artist.id}
                                    >
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <GridListTileBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;