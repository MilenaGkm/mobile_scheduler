import React, { useState,useEffect } from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
}));

const Msgs = ({ apiMsgs, apiUsers, isLoading, error, loggedUser, fetchMsgs, fetchUsers, addMsg, deleteMsg }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [msgs, setMsgs] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetchMsgs(loggedUser._id)
}, [])
  console.log(loggedUser);
  console.log(apiMsgs);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography noWrap={expanded} variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleExpandClick} aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
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