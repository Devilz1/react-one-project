import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>2.&nbsp;</strong>
                    Как тебя зовут?
                </span>
                <small>4 из 8</small>
            </p>

            <AnswersList
                answers={props.answers}
            />
        </div>
    )
}

export default ActiveQuiz