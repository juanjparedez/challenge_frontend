import React, { useState, useEffect, useContext } from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { GlobalContext } from '../context/GlobalState'

function preventDefault(event) {
	event.preventDefault()
}

const useStyles = makeStyles(theme => ({
	depositContext: {
		flex: 1,
	},
	title: {
		marginBottom: theme.spacing(3),
	},
}))

const Balance = () => {
	const { loading, list } = useContext(GlobalContext)
	const [totalAmount, setTotalAmount] = useState(null)
	const [totalIncome, setTotalIncome] = useState(null)
	const [totalOutcome, setTotalOutcome] = useState(null)

	useEffect(() => {
		if (list) {
			let totalAmount = list.reduce((acc, transaction) => {
				return acc + transaction.amount
			}, 0)
			// console.log(totalAmount)
			let totalIncome = 0
			let totalOutcome = 0
			list.forEach(el => {
				if (el.category === 'Income') {
					totalIncome += el.amount
				} else {
					totalOutcome += el.amount
				}
			})

			// console.log({ totalIncome })
			// console.log({ totalOutcome })
			setTotalAmount(totalAmount)
			setTotalIncome(totalIncome)
			setTotalOutcome(totalOutcome * -1)
			return () => {}
		}
	}, [list])

	const classes = useStyles()
	return (
		<React.Fragment>
			<Title className={classes.title}>Balance</Title>
			<Typography color='textSecondary'>Total Amount</Typography>
			<Typography component='p' variant='h5'>
				$ {totalAmount && totalAmount}
			</Typography>
			<Typography color='textSecondary'>Total Income</Typography>
			<Typography component='p' variant='h5'>
				$ {totalIncome && totalIncome}
			</Typography>
			<Typography color='textSecondary'>Total Outcome</Typography>
			<Typography component='p' variant='h5'>
				$ {totalOutcome && totalOutcome}
			</Typography>

			<Typography color='textSecondary'></Typography>
			{/* <div>
				<Link color='primary' href='/' onClick={preventDefault}>
					View balance
				</Link>
			</div> */}
		</React.Fragment>
	)
}

export default Balance
