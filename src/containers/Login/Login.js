import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { getLoggedUser } from '../../redux/actions/user';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import NavigationTabs from "../NavigationTabs/NavigationTabs";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        marginBottom: '20px',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    msgBtn: {
        padding: '28px',
        justifyContent: 'space-between',

    },
    textField: {
        marginTop: '18px',
        marginBottom: '15px',
    },
    formControl: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
    },
    paper: {
        marginTop: '5px',
        marginBottom: '15px',
    },
    dateLabels: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '30px',
    },
    dateLabel: {
        padding: '8px',
    }
}));



const Login = ({ loggedUser, isLoading, error, state, fetchUser, addSubmitShift }) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [redirect, setRedirect] = useState(true);

    const handleUserInputs = (key, value) => setUser({ ...user, [key]: value })

    const submitUser = async () => {
        await fetchUser(user)
    }

    if (loggedUser._doc) {
        return (
            <Redirect to="/dashboard" />
        )
    } else {
        return (
            <div>
                <input onChange={e => handleUserInputs(e.target.name, e.target.value)}
                    name="username"
                    placeholder="Username" />
                <br />
                <input onChange={e => handleUserInputs(e.target.name, e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Password" />
                <br />
                <button onClick={submitUser} >Login</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser.loggedUser,
    isLoading: state.loggedUser.loading,
    error: state.loggedUser.error,
    state: state,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (loggedUser) => dispatch(getLoggedUser(loggedUser)),
    // addSubmitShift: (subShiftForm) => dispatch(addToDbSubShift(subShiftForm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);