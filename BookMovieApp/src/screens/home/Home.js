import React, {Component} from 'react';
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

    render() {
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />

                <div className="heading-upcoming-movies">
                    <span>Upcoming Movies</span>
                </div>
            </div >
        )
    }
}

export default Home;