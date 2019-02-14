import React from 'react'
import classes from './AnswerItem.css'

const AnswerItem = props => {

    const arrayClasses = [classes.AnswerItem]

    if(props.state) {
        arrayClasses.push(classes[props.state])
    }

    return(
        <li
            className={arrayClasses.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem