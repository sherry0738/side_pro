import React from 'react';
import './Quizzes.css';

const quizzes = props => {
    const answer = props.answers.map((answer, i) => {
        return (
            <li key={i}>
                {answer.title}: {answer.description}
            </li>
        );
    });
    return (
        <div>
            <p>{props.question_body}</p>
            <ul>{answer}</ul>
        </div>
    );
};

export default quizzes;