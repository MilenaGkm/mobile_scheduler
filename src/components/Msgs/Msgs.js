import React from 'react'
import { useStyles } from './styles';

export default function Msgs() {
    const classes = useStyles();
    return (
        <div className={classes.msgs}>
            <div>༼ つ ◕_◕ ༽つ</div>
            <div>Msgs Tab</div>
        </div>
    )
}