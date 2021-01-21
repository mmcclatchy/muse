import React from 'react';

import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './character_card.css';
import CharacterTraits from './CharacterTraits';
import { withStyles } from '@material-ui/core';

//***********************************************

const Tabs = withStyles({
  flexContainer: {
    justifyContent: 'space-around',
  }
})(MuiTabs)

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
        <Box p={3} style={{ height: '100%', width: '100%', padding: 0 }} >
          <Typography 
            variant='body1' 
            component='div'
            style={{ height: '100%' }}
          >
            {children}
          </Typography>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    gridRow: '2 / span 1',
    gridColumn: '1 / span 1',
    zIndex: 100,
  },
  character_info: {
  },
  header: {
    backgroundColor: theme.palette.primary.transparent,
    borderRight: '2px solid var(--secondary)',
    borderLeft: '2px solid var(--secondary)',
    borderTop: '2px solid var(--secondary)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '40px',
    display: 'flex',
  },
  headerTabs: {
    height: '40px',
    minHeight: '30px',
    border: 'none'
  },
  tab: {
    fontWeight: 'bold',
    height: '40px',
    minHeight: '30px',
  },
  panelWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.backgroundColor,
    borderRight: '2px solid var(--secondary)',
    borderLeft: '2px solid var(--secondary)',
    borderBottom: '2px solid var(--secondary)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 24
  },
  tabPanel: {
    // display: 'flex',
    // justifyContent: 'space-around',
    height: '100%',
  },
  traits: {
    height: '100%'
  },
  bioWrapper: {
    display: 'flex',
    minHeight: 100
  },
  bio: {
    height: '100%',
    width: '100%',
    padding: 10
  },
  
  
  
  '@media screen and (orientation: portrait)': {
    panelWrapper: {
      padding: 5,
    }
  },
  '@media screen and (max-device-height: 500px) and (orientation: landscape)': {
    root: { 
      height: '50%'
    },
    panelWrapper: {
      padding: 3,
      overflow: 'auto',
      height: 100
    }
  }
  
}));


//***********************************************

export default function CharacterInfo(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  
  
  
  return (
    <div className={classes.root}>
      
      <AppBar position="static" className={classes.header} >
        <Tabs 
          value={value} 
          onChange={handleChange} 
          className={classes.headerTabs}
          aria-label="simple tabs example"
        >
          <Tab label="Traits" disabled={false} className={classes.tab} {...a11yProps(0)} />
          <Tab label="Bio" className={classes.tab} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      
      <div className={classes.panelWrapper}>
        <TabPanel value={value} index={0} className={classes.tabPanel} >
            <CharacterTraits props={props.props} className={classes.traits} />
        </TabPanel>
        
        <TabPanel value={value} index={1} className={classes.tabPanel} >
          <div className={classes.bioWrapper} >
            <div className={classes.bio} >{props.props.bio}</div>
          </div>
        </TabPanel>
      </div>
    
    </div>
  )
}