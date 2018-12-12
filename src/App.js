import React, { Component } from 'react';
import Quizzes from './Quizzes';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: ''
        };
    }

    componentDidMount() {
        let mockUrl = 'https://wt-cbcccf288a9296cc9f9684fd6ba1f72f-0.sandbox.auth0-extend.com/empty-function';

        fetch(mockUrl)
            .then(res => res.json())
            .then(res => {
                this.setState({ quizzes: res.quizzes });
            });
    }

    render() {
        let quizzes = 'loading';
        if (this.state.quizzes) {
            quizzes = this.state.quizzes.map((quiz, index) => {
                return <Quizzes question_body={quiz.question_body} answers={quiz.answers} key={index} />;
            });
        }

        return (
            <div className="App">
                <div className="App-header">
                    <div>
                        <h1>Welcome to G-Aurora Team</h1>
                    </div>
                    <p><a href="#">Log in</a><strong> | </strong><a href="#">Sign up</a></p>
                </div>
                {quizzes}
            </div>
        );
    }
}
export default App;

