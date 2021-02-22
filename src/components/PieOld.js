import React, {
	Fragment,
	useState,
	useEffect,
	useContext,
	Component,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { GlobalContext } from '../context/GlobalState'

import CanvasJSReact from '../assets/canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 420,
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
					let amount = el.amount > 0 ? el.amount : el.amount * -1
					let label = el.category
					dataPoints.push({ x, y, label, amount })
				}
			})
			// console.log({ dataPoints })
			setData(dataPoints)
		}
		return () => {}
	}, [list])

	const options = {
		exportEnabled: false,
		animationEnabled: true,
		// title: {
		// 	text: 'Balance',
		// },
		data: [
			{
				type: 'pie',
				startAngle: 75,
				toolTipContent: '<b>{label}</b>: {y}%',
				showInLegend: 'true',
				legendText: '{label}',
				indexLabelFontSize: 14,
				indexLabel: '{label} - ${amount}',
				dataPoints: data,
			},
		],
	}

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
					<div>
						{data && (
							<CanvasJSChart
								options={options}
								/* onRef={ref => this.chart = ref} */
							/>
						)}
						{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
					</div>
				</Paper>
			</Grid>
		</Fragment>
	)
}

export default Dashboard
