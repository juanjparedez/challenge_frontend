import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from './components/Dashboard'

import { GlobalProvider } from './context/GlobalState'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}))

export default function ComplexGrid() {
	const classes = useStyles()

	return (
		<GlobalProvider>
			<div className={classes.root}>
				{/* <Dashboard /> */}
				<Dashboard />
			</div>
		</GlobalProvider>
	)
}
