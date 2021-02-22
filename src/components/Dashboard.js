import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import PieGraph from './PieGraph'
import Balance from './Balance'

function SyncInfo() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			Last sync {new Date().getHours()}:{new Date().getMinutes()} /{' '}
			{new Date().getDate()}-{new Date().getMonth() + 1}-
			{new Date().getFullYear()}
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
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

const Dashboard = () => {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<Fragment>
			<Container maxWidth='lg' className={classes.container}>
				<Grid container spacing={3}>
					{/* Chart */}
					<PieGraph />
					{/* Recent Deposits */}
					<Grid item xs={12} md={4} lg={3}>
						<Paper className={fixedHeightPaper}>
							{/* <Deposits /> */}
							{/* Acá estaban los Depositos Recientes */}
							<Balance />
						</Paper>
					</Grid>
					{/* Recent Orders */}
					{/* <Grid item xs={12}>
							<Paper className={classes.paper}>
								
								Acá estaban las Ordenes
							</Paper>
						</Grid> */}
				</Grid>
				<Box pt={4}>
					<SyncInfo />
				</Box>
			</Container>
		</Fragment>
	)
}

export default Dashboard
