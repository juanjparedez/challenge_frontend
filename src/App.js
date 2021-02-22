import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Home from './components/Home'

import { GlobalProvider } from './context/GlobalState'
import { BrowserRouter as Router } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}))

export default function ComplexGrid() {
	const classes = useStyles()

	return (
		<GlobalProvider>
			<Router>
				<div className={classes.root}>
					<Home />
				</div>
			</Router>
		</GlobalProvider>
	)
}
