import React, { Fragment, useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { GlobalContext } from '../context/GlobalState'
import { VictoryPie } from 'victory'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 400,
	},
}))

const Dashboard = () => {
	const { loading, list } = useContext(GlobalContext)
	const [data, setData] = useState(null)
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

	useEffect(() => {
		let dataPoints = []
		if (list !== null) {
			const totalAmount = list.reduce((acc, el) => {
				return acc + el.amount
			}, 0)
			const totalOutcome = list.reduce((acc, el) => {
				if (el.category !== 'Income') {
					return acc + el.amount * -1
				} else {
					return acc
				}
			}, 0)
			// console.log({ totalAmount })
			// console.log({ totalOutcome })
			list.map(el => {
				// dataPoints.push({x: el.id})
				if (el.category !== 'Income') {
					let x = el.id
					let y = (el.amount * -1 * 100) / totalOutcome
					let label = el.category
					dataPoints.push({ x, y, label })
				}
			})
			// console.log({ dataPoints })
			setData(dataPoints)
		}
		return () => {}
	}, [list])

	return (
		<Fragment>
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					{/* <Chart /> */}

					{/* {list &&
						list.map((transaction, idx) => {
							return (
								<p key={idx}>
									{transaction.name} ${transaction.amount}
								</p>
							)
						})} */}
					{data && (
						<VictoryPie
							animate={{
								duration: 2000,
							}}
							// height={200}
							colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
							data={data}
							labelRadius={({ innerRadius }) => innerRadius + 15}
							radius={({ datum }) => 50 + datum.y * 2}
							innerRadius={20}
							style={{
								labels: { fill: 'black', fontSize: 15, fontWeight: 'bold' },
							}}
						/>
					)}
				</Paper>
			</Grid>
		</Fragment>
	)
}

export default Dashboard
