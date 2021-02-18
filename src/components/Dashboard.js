import React, { Fragment, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { GlobalContext } from '../context/GlobalState'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}))

const Dashboard = () => {
	const { loading, list } = useContext(GlobalContext)
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<Fragment>
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					{/* <Chart /> */}

					{list &&
						list.map((transaction, idx) => {
							return (
								<p key={idx}>
									{transaction.name} ${transaction.amount}
								</p>
							)
						})}
				</Paper>
			</Grid>
		</Fragment>
	)
}

export default Dashboard
