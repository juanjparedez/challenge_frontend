import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import Hidden from '@material-ui/core/Hidden'
import withWidth from '@material-ui/core/withWidth'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloseIcon from '@material-ui/icons/Close'
import { mainListItems } from './listItems'
import { GlobalContext } from '../context/GlobalState'

import { Switch, useLocation, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import Incomes from './Incomes'
import Expenses from './Expenses'
import CodeTest from './CodeTest'

// import Chart from './Chart'
// import Deposits from './Deposits'
// import Orders from './Orders'

const drawerWidth = 180

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	hidden: {
		display: 'none',
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(2),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 280,
	},
}))

const Home = props => {
	const { loading, list } = useContext(GlobalContext)
	const { width } = props
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [hidden, setHidden] = useState(false)

	const handleDrawerOpen = () => {
		setOpen(true)
		setHidden(false)
	}
	const handleDrawerClose = () => {
		setOpen(false)
	}
	const handleDrawerClose2 = () => {
		setOpen(false)
		setHidden(true)
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='absolute'
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component='h1'
						variant='h6'
						color='inherit'
						noWrap
						className={classes.title}
					>
						CA$H Flow
					</Typography>
					{/* <IconButton color='inherit'>
						<Badge badgeContent={4} color='secondary'>
							<NotificationsIcon />
						</Badge>
					</IconButton> */}
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!open && classes.drawerPaperClose,
						hidden && classes.hidden
					),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
					<Hidden smUp>
						<IconButton onClick={handleDrawerClose2}>
							<CloseIcon />
						</IconButton>
					</Hidden>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				{/* <Divider />
				<List>{secondaryListItems}</List> */}
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />

				<Switch>
					<Route exact path='/'>
						<Dashboard />
					</Route>
					<Route path='/incomes'>
						<Incomes />
					</Route>
					<Route path='/expenses'>
						<Expenses />
					</Route>
					<Route path='/test'>
						<CodeTest />
					</Route>
				</Switch>
			</main>
		</div>
	)
}

Home.propTypes = {
	width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
}

export default withWidth()(Home)
