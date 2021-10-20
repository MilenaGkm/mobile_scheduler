import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getMsgs, addToDbMsg, deleteMsgFromDb } from '../../redux/actions/msgs';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
        margin: '20px',
        order: '0',
        flex: '0 1 auto',
        alignSelf: 'auto',
        borderRadius: '8px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '800px',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        // margin : '20px'
        // alignItems: 'center',
        // listStyle: 'none',
        // padding: theme.spacing(0.5),
        // Height: '500px'
    },
}));

const Msgs = ({ apiMsgs, apiUsers, isLoading, error, loggedUser, fetchMsgs, fetchUsers, addMsg, deleteMsg }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState([]);
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        fetchMsgs(loggedUser._id)
    }, [])

    useEffect(() => {
        let newExpanded = []
        for (let i = 0; i < apiMsgs.length; i++) {
            newExpanded.push(true)
        }
        setExpanded(newExpanded)
    }, [apiMsgs])

    const handleExpandClick = (i) => {
        console.log(i);
        let expand = [...expanded]
        expand[i] = !expand[i]
        setExpanded(expand)
    }

    const handleDeleteMsg = async (msg) => {
        await deleteMsg(msg)
        await fetchMsgs(loggedUser._id)
    }

    return (
        <div className={classes.flexContainer}>
            {apiMsgs.map((msg, i) => (
                <Card key={i} className={classes.root}>
                    <CardHeader
                        title={msg.subject}
                        subheader={msg.date}
                    />
                    <CardContent>
                        <Typography className="msgBody" noWrap={expanded[i]} variant="body2" color="textSecondary" component="p">
                            {msg.body}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="delete" onClick={() => handleDeleteMsg(msg._id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleExpandClick(i)} aria-label="show more">
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}


const mapStateToProps = (state) => ({
    apiMsgs: state.msgs.msgs,
    isLoading: state.msgs.loading,
    error: state.msgs.error,
    loggedUser: state.loggedUser.loggedUser._doc,
})

const mapDispatchToProps = (dispatch) => ({
    fetchMsgs: (userId) => dispatch(getMsgs(userId)),
    deleteMsg: (msg) => dispatch(deleteMsgFromDb(msg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Msgs);