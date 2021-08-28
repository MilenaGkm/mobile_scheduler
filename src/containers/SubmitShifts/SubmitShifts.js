import React, { useState, useEffect } from "react"
import { connect } from "react-redux";
import { getUserReqShift, addToDbSubShift } from '../../redux/actions/shifts';
import { makeStyles } from '@material-ui/core/styles';
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



const SubmitShifts = ({ apiUserRequestShift, isLoading, error, fetchUserRequestShift, addSubmitShift }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([{ username: "IronMan", id: "60e5e11658a02d491834e1c6" }, { username: "SpiderMan", id: "60e5e204bc693828f836b65b" }, { username: "JakeDope", id: "60e5e23abc693828f836b65d" }]);
    const [reqShift, setReqShift] = useState({});
    const [subShift, setSubShift] = useState({ userId: "", wantedShifts: 0, comment: "", shifts: [] });

    const updateSubShift = (key, value) => setSubShift({ ...subShift, [key]: value })
    
    useEffect(() => {
        if (reqShift.shifts) {
            const checkboxes = []
            for (let i = 0; i < reqShift.shifts.length; i++) {
                const checkboxesToAdd = {
                    adminId: reqShift.adminId,
                    date: reqShift.shifts[i].date,
                    morningCheckbox: false,
                    noonCheckbox: false,
                    eveningCheckbox: false,
                }
                checkboxes.push(checkboxesToAdd)
            }
            updateSubShift("shifts", checkboxes)
        }
    }, [reqShift])

    useEffect(() => {
        setReqShift(apiUserRequestShift)
        updateSubShift("wantedShifts", 0);
    }, [apiUserRequestShift])



    const submitShifts = () => {
        addSubmitShift(subShift)
        setOpen(false);
    }

    const handleCheckboxChange = (e, i) => {
        let updateCheckbox = { ...subShift }
        updateCheckbox.shifts[i][e.target.name] = e.target.checked
        e.target.checked ? updateCheckbox.wantedShifts++ : updateCheckbox.wantedShifts--;
        setSubShift(subShift[i] = updateCheckbox)
    };

    const fetchUserShifts = async (userId) => {
        await fetchUserRequestShift(userId);
        updateSubShift("userId", userId);
        setOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {users.map((user, i) => {
                return (
                    <Button key={i} variant="outlined" color="primary" onClick={() => fetchUserShifts(user.id)}>
                        {user.username}
                    </Button>
                )
            })}
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                New Shift Req
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>
                    <FormControl className={classes.dateLabels}>
                        <FormLabel component="legend">
                            From
                            <Paper label="From" className={classes.dateLabel}> {reqShift.dateFrom}</Paper>
                        </FormLabel>
                        <FormLabel component="legend">
                            To
                            <Paper className={classes.dateLabel}>{reqShift.dateTo}</Paper>
                        </FormLabel>
                    </FormControl>
                    {subShift.shifts.map((box, i) => {
                        return (
                            <FormControl key={i} fullWidth >
                                <FormLabel component="legend">{box.date}</FormLabel>
                                <Paper className={classes.paper}>
                                    <FormGroup row className={classes.formControl}>
                                        <FormControlLabel
                                            disabled={reqShift.shifts[i].morningCheckbox ? false : true}
                                            control={
                                                <Checkbox checked={box.morningCheckbox} onChange={e => handleCheckboxChange(e, i)} color="primary" name="morningCheckbox" />}
                                            label="Morning"
                                        />
                                        <FormControlLabel
                                            disabled={reqShift.shifts[i].noonCheckbox ? false : true}
                                            control={
                                                <Checkbox checked={box.noonCheckbox} onChange={e => handleCheckboxChange(e, i)} color="primary" name="noonCheckbox" />}
                                            label="Noon"
                                        />
                                        <FormControlLabel
                                            disabled={reqShift.shifts[i].eveningCheckbox ? false : true}
                                            control={
                                                <Checkbox checked={box.eveningCheckbox} onChange={e => handleCheckboxChange(e, i)} color="primary" name="eveningCheckbox" />}
                                            label="Evening"
                                        />
                                    </FormGroup>
                                </Paper>
                            </FormControl>
                        )
                    })}
                </DialogContent>
                <DialogActions className={classes.msgBtn}>
                    <Button className="msgBtn" onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button className="msgBtn" onClick={submitShifts} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    apiUserRequestShift: state.userRequestShift.userRequestShift,
    isLoading: state.userRequestShift.loading,
    error: state.userRequestShift.error,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserRequestShift: (userId) => dispatch(getUserReqShift(userId)),
    addSubmitShift: (subShiftForm) => dispatch(addToDbSubShift(subShiftForm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitShifts);