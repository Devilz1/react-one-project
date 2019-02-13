import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
    return (
        <ul className={classes.AnswersList}>
            { props.answers.map((anwser, index) => {
                return (
                    <AnswerItem
                        key={index}
                        answer={anwser}
                    />
                )
            }) }
        </ul>
    )
}

export default AnswersList