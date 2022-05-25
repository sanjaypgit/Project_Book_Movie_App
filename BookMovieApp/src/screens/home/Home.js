import React, {Component} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
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

        // Fetch released movies and set the value of component state "moviesReleased"
        let moviesReleasedData = null;
        let moviesReleasedXHR = new XMLHttpRequest();
        moviesReleasedXHR.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        moviesReleasedXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        moviesReleasedXHR.send(moviesReleasedData);
        moviesReleasedXHR.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                that.setState({moviesReleased: JSON.parse(this.responseText).movies});
            }
        });

        // Fetch array of movie artists and set the value of component state "moviesArtistsList"
        let moviesArtistsListData = null;
        let moviesArtistsListXHR = new XMLHttpRequest();
        moviesArtistsListXHR.open("GET", this.props.baseUrl + "artists");
        moviesArtistsListXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        moviesArtistsListXHR.send(moviesArtistsListData);
        moviesArtistsListXHR.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                that.setState({moviesArtistsList: JSON.parse(this.responseText).artists});
            }
        });

        // Fetch array of movie genres and set the value of component state "moviesGenresList"
        let moviesGenresListData = null;
        let moviesGenresListXHR = new XMLHttpRequest();
        moviesGenresListXHR.open("GET", this.props.baseUrl + "genres");
        moviesGenresListXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        moviesGenresListXHR.send(moviesGenresListData);
        moviesGenresListXHR.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                that.setState({moviesGenresList: JSON.parse(this.responseText).genres});
            }
        });
    }


    // Filter handler functions
    clickForMovieDetailsFilterHandler = (movieId) => {this.props.history.push('/movie/' + movieId);}
    movieNameFilterHandler = (event) => {this.setState({movieName: event.target.value});}
    movieGenresFilterHandler = (event) => {this.setState({movieGenres: event.target.value });}
    movieArtistsFilterHandler = (event) => {this.setState({movieArtists: event.target.value});}
    movieReleaseDateStartFilterHandler = (event) => {this.setState({movieReleaseDateStart: event.target.value});}
    movieReleaseDateEndFilterHandler = (event) => {this.setState({movieReleaseDateEnd: event.target.value});}

    buttonApplyFilterHandler = () => {
        let that = this;

        // Fetch filtered movies using "query" string in API url & update the value of component state "moviesReleased"
        let filterQueryString = "?status=RELEASED";
        if (this.state.movieName !== "") {filterQueryString += "&title=" + this.state.movieName;}
        if (this.state.movieGenres.length > 0) {filterQueryString += "&genre=" + this.state.movieGenres.toString();}
        if (this.state.movieArtists.length > 0) {filterQueryString += "&artists=" + this.state.movieArtists.toString();}
        if (this.state.movieReleaseDateStart !== "") {filterQueryString += "&start_date=" + this.state.movieReleaseDateStart;}
        if (this.state.movieReleaseDateEnd !== "") {filterQueryString += "&end_date=" + this.state.movieReleaseDateEnd;}

        let moviesReleasedFilteredData = null;
        let moviesReleasedFilteredXHR = new XMLHttpRequest();
        moviesReleasedFilteredXHR.open("GET", this.props.baseUrl + "movies" + encodeURI(filterQueryString));
        moviesReleasedFilteredXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        moviesReleasedFilteredXHR.send(moviesReleasedFilteredData);
        moviesReleasedFilteredXHR.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                that.setState({moviesReleased: JSON.parse(this.responseText).movies});
            }
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                {/* Element - Header */}
                <Header baseUrl={this.props.baseUrl} />

                {/* Element - Upcoming Movies Heading */}
                <div className="heading-upcoming-movies">
                    <span>Upcoming Movies</span>
                </div>

                {/* Element - Grid of upcoming movies */}
                <GridList className={classes.gridUpcomingMovies} cols={6} cellHeight={250} >
                    {this.state.moviesUpcoming.map(movie => (
                        <GridListTile key={"upcoming-movie" + movie.id}>
                            <img src={movie.poster_url} className="poster-of-movies" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>

                {/* Element - Grid of released movies along with filters */}
                <div className="flex-container">
                    <div className="left-of-flex-container">
                        <GridList className={classes.gridReleasedMovies} cellHeight={350} cols={4} >
                            {this.state.moviesReleased.map(movie => (
                                <GridListTile
                                    onClick={() => this.clickForMovieDetailsFilterHandler(movie.id)}
                                    className="released-movie-tile"
                                    key={"released-movie" + movie.id}
                                >
                                    <img src={movie.poster_url} className="poster-of-movies" alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

                    <div className="right-of-flex-container">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.filterFormControl}>
                                    <Typography className={classes.filterCardHeading} >
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl className={classes.filterFormControl}>
                                    <InputLabel htmlFor="inputFieldMovieName">Movie Name</InputLabel>
                                    <Input id="inputFieldMovieName" onChange={this.movieNameFilterHandler} />
                                </FormControl>

                                <FormControl className={classes.filterFormControl}>
                                    <InputLabel htmlFor="checkboxesToSelectGenres">Genres</InputLabel>
                                    <Select
                                        multiple input={<Input id="checkboxesToSelectGenres" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.movieGenres}
                                        onChange={this.movieGenresFilterHandler}
                                    >
                                        {this.state.moviesGenresList.map( (genre) => (
                                            <MenuItem
                                                key={genre.id}
                                                value={genre.genre}
                                            >
                                                <Checkbox
                                                    checked={this.state.movieGenres.indexOf(genre.genre) > -1}
                                                />
                                                <ListItemText primary={genre.genre} />
                                            </MenuItem>))
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.filterFormControl}>
                                    <InputLabel htmlFor="checkboxesToSelectArtists">Artists</InputLabel>
                                    <Select
                                        multiple input={<Input id="checkboxesToSelectArtists" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.movieArtists}
                                        onChange={this.movieArtistsFilterHandler}
                                    >
                                        {this.state.moviesArtistsList.map( (artist) => (
                                            <MenuItem
                                                key={artist.id}
                                                value={artist.first_name + " " + artist.last_name}
                                            >
                                                <Checkbox
                                                    checked={this.state.movieArtists.indexOf(artist.first_name
                                                                                             + " "
                                                                                             + artist.last_name) > -1}
                                                />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>))
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.filterFormControl}>
                                    <TextField
                                        id="filterFieldReleaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{shrink: true}}
                                        onChange={this.movieReleaseDateStartFilterHandler}
                                    />
                                </FormControl>

                                <FormControl className={classes.filterFormControl}>
                                    <TextField
                                        id="filterFieldReleaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{shrink: true}}
                                        onChange={this.movieReleaseDateEndFilterHandler}
                                    />
                                </FormControl>
                                <br />

                                <br />
                                <FormControl className={classes.filterFormControl}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.buttonApplyFilterHandler()}
                                    >
                                        APPLY
                                    </Button>
                                </FormControl>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div >
        )
    }
}

// Style class targeting the flex-container of the filter card.
const styles = (theme) => ({

    upcomingMoviesHeading: {
        background: '#ff9999',
        padding: '8px',
        textAlign: 'center',
        fontSize: '1rem'
    },

    gridUpcomingMovies: {
        flexWrap: 'nowrap',
    },

    gridReleasedMovies: {
        cursor: 'pointer'
    },

    filterFormControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },

    filterCardHeading: {
        color: theme.palette.primary.light,
    }

});

export default withStyles(styles)(Home);
