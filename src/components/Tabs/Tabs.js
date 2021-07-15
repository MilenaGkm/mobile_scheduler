import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useStyles } from './styles';
import Schedule from '../Schedule/Schedule';
import Shifts from '../Shifts/Shifts';
import Msgs from '../Msgs/Msgs';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function NavigationTabs() {
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Fragment className={classes.root}>
            <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab label="Schedule" {...a11yProps(0)} />
            <Tab label="Shifts" {...a11yProps(1)} />
            <Tab label="Msgs" {...a11yProps(2)} />
            </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Schedule />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Shifts />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Msgs />
            </TabPanel>
        </Fragment>
    )
}