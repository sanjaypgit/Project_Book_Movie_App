import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {withStyles} from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import './Home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesUpcoming: [],
            moviesReleased: [],
            moviesArtistsList: [],
            moviesGenresList: [],
            movieArtists: [],
            movieGenres: [],
            movieName: "",
            movieReleaseDateStart: "",
            movieReleaseDateEnd: ""
        }
    }

    componentDidMount() {
        let that = this;

        // Fetch upcoming movies and set the value of component state "moviesUpcoming"
        let upcomingMovieData = null;
        let upcomingMovieXHR = new XMLHttpRequest();
        upcomingMovieXHR.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        upcomingMovieXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        upcomingMovieXHR.send(upcomingMovieData);
        upcomingMovieXHR.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                that.setState({moviesUpcoming: JSON.parse(this.responseText).movies});
            }
        });

    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                {/*Element - Header*/}
                <Header baseUrl={this.props.baseUrl} />

                {/*Element - Upcoming Movies Heading */}
                <div className="heading-upcoming-movies">
                    <span>Upcoming Movies</span>
                </div>

                {/*Element - Grid of upcoming movies*/}
                <GridList className={classes.gridUpcomingMovies} cols={6} cellHeight={250} >
                    {this.state.moviesUpcoming.map(movie => (
                        <GridListTile key={"upcoming-movie" + movie.id}>
                            <img src={movie.poster_url} className="poster-of-movies" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>
            </div >
        )
    }
}

const styles = () => ({
    upcomingMoviesHeading: {
        background: '#ff9999',
        padding: '8px',
        textAlign: 'center',
        fontSize: '1rem'
    },

    gridUpcomingMovies: {
        flexWrap: 'nowrap',
    }
});

export default withStyles(styles)(Home);
