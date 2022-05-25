import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import logo from '../../assets/logo.svg';
import './Header.css'
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabRegLoginId: 0,
            modalPoppedUp: false,
            regFirstname: "",
            regLastname: "",
            regEmail: "",
            regPassword: "",
            regContact: "",
            regFirstnameRequiredFlag: "displayOff",
            regLastnameRequiredFlag: "displayOff",
            regEmailRequiredFlag: "displayOff",
            regPasswordRequiredFlag: "displayOff",
            regContactRequiredFlag: "displayOff",
            registrationSuccessFlag: false,
            loginUsername: "",
            loginPassword: "",
            loginUsernameRequiredFlag: "displayOff",
            loginPasswordRequiredFlag: "displayOff",
            userLoggedIn: sessionStorage.getItem("access-token") != null
        }
    }

    clickLoginButtonHandler = () => {
        this.state.loginUsername === "" ?
            this.setState({loginUsernameRequiredFlag: "displayOn"})
            :
            this.setState({loginUsernameRequiredFlag: "displayOff"});

        this.state.loginPassword === "" ?
            this.setState({loginPasswordRequiredFlag: "displayOn"})
            :
            this.setState({loginPasswordRequiredFlag: "displayOff"});

        if (this.state.loginUsername !== "" && this.state.loginPassword !== "")
        {
            let loginBody = null;
            let loginXHR = new XMLHttpRequest();
            loginXHR.open("POST", this.props.baseUrl + "auth/login");
            loginXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            loginXHR.setRequestHeader("Authorization", "Basic "
                                        + window.btoa(this.state.loginUsername
                                        + ":"
                                        + this.state.loginPassword)
            );
            loginXHR.send(loginBody);

            let that = this;
            loginXHR.addEventListener("readystatechange", function() {
                if (this.readyState === 4) { // SP RVW
                    sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                    sessionStorage.setItem("access-token", loginXHR.getResponseHeader("access-token"));
                    that.setState({userLoggedIn: true});
                    that.closeRegLoginModalHandler();
                }
            });
        }
    }

    clickRegisterButtonHandler = () => {
        this.state.regFirstname === "" ?
            this.setState({regFirstnameRequiredFlag: "displayOn"})
            :
            this.setState({regFirstnameRequiredFlag: "displayOff"});

        this.state.regLastname === "" ?
            this.setState({regLastnameRequiredFlag: "displayOn"})
            :
            this.setState({regLastnameRequiredFlag: "displayOff"});

        this.state.regEmail === "" ?
            this.setState({regEmailRequiredFlag: "displayOn"})
            :
            this.setState({regEmailRequiredFlag: "displayOff"});

        this.state.regPassword === "" ?
            this.setState({regPasswordRequiredFlag: "displayOn"})
            :
            this.setState({regPasswordRequiredFlag: "displayOff"});

        this.state.regContact === "" ?
            this.setState({regContactRequiredFlag: "displayOn"})
            :
            this.setState({regContactRequiredFlag: "displayOff"});

        if (this.state.regFirstname !== "" && // SP RVW
            this.regLastname !== "" &&
            this.state.regEmail !== "" &&
            this.state.regPassword !== "" &&
            this.state.regContact !== "")
        {
            let signupBody = JSON.stringify({
                "email_address": this.state.regEmail,
                "first_name": this.state.regFirstname,
                "last_name": this.state.regLastname,
                "mobile_number": this.state.regContact,
                "password": this.state.regPassword
            });

            let signupXHR = new XMLHttpRequest();
            signupXHR.open("POST", this.props.baseUrl + "signup");
            signupXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            signupXHR.send(signupBody);

            let that = this;
            signupXHR.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    that.setState({registrationSuccessFlag: true});
                }
            });
        }
    }

    clickLogoutButtonHandler = () => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        this.setState({userLoggedIn: false});
    }

    openRegLoginModalHandler = () => {this.setState({modalPoppedUp: true});}
    closeRegLoginModalHandler = () => {this.setState({modalPoppedUp: false, registrationSuccessFlag: false});} //SP RVW
    modalTabChangeHandler = (event, value) => {this.setState({ tabRegLoginId: value});}
    inputUsernameChangeHandler = (e) => {this.setState({loginUsername: e.target.value});}
    inputLoginPasswordChangeHandler = (e) => {this.setState({loginPassword: e.target.value});}
    inputFirstNameChangeHandler = (e) => {this.setState({regFirstname: e.target.value});}
    inputLastNameChangeHandler = (e) => {this.setState({regLastname: e.target.value});}
    inputEmailChangeHandler = (e) => {this.setState({regEmail: e.target.value});}
    inputRegisterPasswordChangeHandler = (e) => {this.setState({regPassword: e.target.value});}
    inputContactChangeHandler = (e) => {this.setState({regContact: e.target.value});}

    render() {
        return (
            <div>
                <header className="header-movies-app">
                    <img src={logo} className="logo-movies-app" alt="Logo Movies App" />
                    {this.state.userLoggedIn ?
                        <div className="button-logout-at-header">
                            <Button
                                variant="contained"
                                color="default"
                                onClick={this.clickLogoutButtonHandler}
                            >
                                Logout
                            </Button>
                        </div>
                        :
                        <div className="button-login-at-header">
                            <Button
                                variant="contained"
                                color="default"
                                onClick={this.openRegLoginModalHandler}
                            >
                                Login
                            </Button>
                        </div>
                    }
                    {this.props.showButtonBookShow === "true" && !this.state.userLoggedIn ?
                        <div className="button-book-show">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.openRegLoginModalHandler}
                            >
                                Book Show
                            </Button>
                        </div>
                        :
                        ""
                    }
                    {this.props.showButtonBookShow === "true" && this.state.userLoggedIn ?
                        <div className="button-book-show">
                            <Link to={"/bookshow/" + this.props.id}> {/* SP RVW */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                >
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        :
                        ""
                    }
                </header>

                <Modal
                    contentLabel="RegLoginModal"
                    style={styleModal}
                    ariaHideApp={false}
                    isOpen={this.state.modalPoppedUp}
                    onRequestClose={this.closeRegLoginModalHandler}
                >
                    <Tabs
                        className="tabs-registration-login"
                        value={this.state.tabRegLoginId}
                        onChange={this.modalTabChangeHandler}
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {this.state.tabRegLoginId === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="login-username">Username</InputLabel>
                                <Input
                                    id="login-username"
                                    type="text"
                                    username={this.state.loginUsername}
                                    onChange={this.inputUsernameChangeHandler}
                                />
                                <FormHelperText className={this.state.loginUsernameRequiredFlag}>
                                    <span className="highlight-error-in-red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="login-password">Password</InputLabel>
                                <Input
                                    id="login-password"
                                    type="password"
                                    loginpassword={this.state.loginPassword}
                                    onChange={this.inputLoginPasswordChangeHandler}
                                />
                                <FormHelperText className={this.state.loginPasswordRequiredFlag}>
                                    <span className="highlight-error-in-red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            {this.state.userLoggedIn === true && // SP RVW
                                <FormControl>
                                    <span className="reg-login-success-message">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br />
                            <br />
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.clickLoginButtonHandler}
                            >
                                LOGIN
                            </Button>
                        </TabContainer>
                    }
                    {this.state.tabRegLoginId === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="reg-firstname">First Name</InputLabel>
                                <Input
                                    id="reg-firstname"
                                    type="text"
                                    firstname={this.state.regFirstname}
                                    onChange={this.inputFirstNameChangeHandler}
                                />
                                <FormHelperText className={this.state.regFirstnameRequiredFlag}>
                                    <span className="highlight-error-in-red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="reg-lastname">Last Name</InputLabel>
                                <Input
                                    id="reg-lastname"
                                    type="text"
                                    lastname={this.state.regLastname}
                                    onChange={this.inputLastNameChangeHandler}
                                />
                                <FormHelperText className={this.state.regLastnameRequiredFlag}>
                                    <span className="highlight-error-in-red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="reg-email">Email</InputLabel>
                                <Input
                                    id="reg-email"
                                    type="text"
                                    email={this.state.regEmail}
                                    onChange={this.inputEmailChangeHandler}
                                />
                                <FormHelperText className={this.state.regEmailRequiredFlag}>
                                    <span className="highlight-error-in-red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="reg-password">Password</InputLabel>
                                <Input
                                    id="reg-password"
                                    type="password"
                                    registerpassword={this.state.regPassword}
                                    onChange={this.inputRegisterPasswordChangeHandler}
                                />
                                <FormHelperText className={this.state.regPasswordRequiredFlag}>
                                    <span className="highlight-error-in-red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="reg-contact">Contact No.</InputLabel>
                                <Input
                                    id="reg-contact"
                                    type="text"
                                    contact={this.state.regContact}
                                    onChange={this.inputContactChangeHandler}
                                />
                                <FormHelperText className={this.state.regContactRequiredFlag}>
                                    <span className="highlight-error-in-red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            {this.state.registrationSuccessFlag === true &&
                                <FormControl>
                                    <span className="reg-login-success-message">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.clickRegisterButtonHandler}
                            >
                                REGISTER
                            </Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
}

const TabContainer = function(props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    )
};

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styleModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default Header;
