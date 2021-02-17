import React, { useState, useEffect, useContext } from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { GlobalContext } from '../context/GlobalState'

function preventDefault(event) {
	event.preventDefault()
}

const useStyles = makeStyles({
	depositContext: {
		flex: 1,
	},
})

const Balance = () => {
	const { loading, list } = useContext(GlobalContext)
	const [total, setTotal] = useState(null)

	useEffect(() => {
		if (list) {
			let totalAmount = list.reduce((acc, transaction) => {
				return acc + transaction.amount
			}, 0)
			// console.log(totalAmount)
			setTotal(totalAmount)
			return () => {}
		}
	}, [list])

	console.log({ list })

	const classes = useStyles()
	return (
		<React.Fragment>
			<Title>Current Balance</Title>
			<Typography component='p' variant='h4'>
				$ {total && total}
			</Typography>
			<Typography
				color='textSecondary'
				className={classes.depositContext}
			></Typography>
			{/* <div>
				<Link color='primary' href='/' onClick={preventDefault}>
					View balance
				</Link>
			</div> */}
		</React.Fragment>
	)
}

export default Balance
