import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Home from './components/Home'

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
				<Home />
			</div>
		</GlobalProvider>
	)
}
