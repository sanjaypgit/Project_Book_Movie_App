import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Details.css';

class Details extends Component {

    render() {
        return (
            <div>
                <Header id={this.props.match.params.id} baseUrl={this.props.baseUrl} showButtonBookShow="true" />
            </div>
        )
    }
}

export default Details;