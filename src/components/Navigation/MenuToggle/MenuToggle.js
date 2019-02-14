import React from 'react'
import classes from './MenuToggle.css'

const MenuToggle = props => {
    const cls = [
        classes.MenuToggle,
        'fa',
    ]

    if(props.isOpen) {
        cls.push('fa-times')
        cls.push(classes.open)
    }else{
        cls.push('fa-bars')
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={props.onToggle}
        >

        </li>
    )
}

export default MenuToggle