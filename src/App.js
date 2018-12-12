import React, { Component } from 'react';
import Quizzes from './Quizzes';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: '',
            isLoggedIn: false,
            avatarUrl: '',
        };
        this.getTokenObj = this.getTokenObj.bind(this);
        this.parseJwt = this.parseJwt.bind(this);
    }

    getTokenObj() {
        return JSON.parse(localStorage.getItem('auth'));
    }

    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    componentDidMount() {
        const tokenObj = this.getTokenObj();
        console.log('tokenObj', tokenObj)
        const idToken = tokenObj.id_token;
        console.log('tokenObj.idToken', idToken)
        tokenObj ? console.log('tokenObj', tokenObj) : console.log('no token');
        if (tokenObj && idToken) {
            this.setState({ isLoggedIn: true });
            const decodedToken = this.parseJwt(idToken);
            console.log('decodedToken', decodedToken);

            this.setState({ avatarUrl: decodedToken.picture });
            //todo:move to service, only call after login
            let mockUrl = 'http://localhost:8001';

            fetch(mockUrl, { method: 'get', headers: new Headers({ Authorization: 'bearer ' + idToken }) })
                .then(res => res.json())
                .then(res => {
                    this.setState({ quizzes: res.quizzes });
                });
        } else {
            this.setState({ isLoggedIn: false });
        }
    }

    render() {
        let quizzes = 'loading';

        const onSuccess = response => {
            this.setState({ isLoggedIn: true });
            localStorage.setItem('auth', JSON.stringify(response.tokenObj));
        };

        const onFailure = () => {
            this.setState({ isLoggedIn: false });
            localStorage.removeItem('auth');
        };

        const logOut = () => {
            this.setState({ isLoggedIn: false, avatarUrl: '' });
            localStorage.removeItem('auth');
        };

        if (this.state.quizzes) {
            quizzes = this.state.quizzes.map((quiz, index) => {
                return <Quizzes question_body={quiz.question_body} answers={quiz.answers} key={index} />;
            });
        }
        const isLoggedIn = this.state.isLoggedIn;
        const avatarUrl = this.state.avatarUrl;
        return (
            <div className="App">
                <div className="App-header">
                    {isLoggedIn ? (
                        <div>
                            <img src={avatarUrl} />
                            <GoogleLogout
                                clientId="201605823214-a65bf5spbckkrhdvgsvu8get3p5jrhb5.apps.googleusercontent.com"
                                buttonText="Logout"
                                onSuccess={logOut}
                            />
                        </div>
                    ) : (
                            <GoogleLogin
                                clientId="201605823214-a65bf5spbckkrhdvgsvu8get3p5jrhb5.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                isSignedIn={this.state.isLoggedIn}
                            />
                        )}
                    <div>
                        <h1>Welcome to G-Aurora Team</h1>
                    </div>
                </div>
                {quizzes}
            </div>
        );
    }
}

export default App;