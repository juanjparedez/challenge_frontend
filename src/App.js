import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from './components/Dashboard'
import axios from 'axios'
import { GlobalProvider } from './context/GlobalState'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}))

export default function ComplexGrid() {
	const classes = useStyles()

	// const [amount, setAmount] = useState(0)

	// const getFromApi = async () => {
	// 	let data = await axios.get('/api/flow/amount')
	// 	// let parsed = await data.amount
	// 	// console.log(data.data)
	// 	setAmount(data.data)
	// }

	// useEffect(() => {
	// 	getFromApi()
	// 	return () => {}
	// }, [])

	return (
		<GlobalProvider>
			<div className={classes.root}>
				{/* <Dashboard /> */}
				<Dashboard />
			</div>
		</GlobalProvider>
	)
}
