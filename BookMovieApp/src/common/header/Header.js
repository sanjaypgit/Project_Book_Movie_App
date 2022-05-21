import React from "react";
import './Header.css';
import logoImage from '../../assets/logo.svg';
import Button from "@material-ui/core/Button";


const Header = () => {
    return (
        <div className="header-container">
            <img className="app-logo" src={logoImage} alt="Book Movie App Logo" />

            {/*Implementation of Login/Logout Button. State and EventHandler Yet To Be Implemented*/}
            {true ?
                <div className="login-logout-button">
                    {/*<Button variant="contained" color="default" onClick={this.openModalHandler}>Login</Button>*/}
                    <Button variant="contained" color="default">Login</Button>
                </div>
                :
                <div className="login-logout-button">
                    {/*<Button variant="contained" color="default" onClick={this.logoutHandler}>Logout</Button>*/}
                    <Button variant="contained" color="default">Logout</Button>
                </div>
            }

            {/*Implementation of "Book Show" Button. State and EventHandler Yet To Be Implemented*/}
            {false ?
                <div className="book-show-button">
                    {/*<Button variant="contained" color="primary" onClick={this.openModalHandler}>Book Show</Button>*/}
                    <Button variant="contained" color="primary">Book Show</Button>
                </div>
                : ""
            }

        </div>
    );
}

export default Header;