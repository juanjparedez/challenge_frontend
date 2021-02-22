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
import {
	PieChart,
	Pie,
	Sector,
	Cell,
	Legend,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

const useStyles = makeStyles(theme => ({
	root: {
		alignContent: 'space-around',
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 440,
	},
}))

const PieGraph = () => {
	const classes = useStyles()

	const { loading, list } = useContext(GlobalContext)

	const [innerData, setInnerData] = useState(null)
	const [outerData, setOuterData] = useState(null)

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

	const COLORS = [
		'#0088FE',
		'#00C49F',
		'#FFBB28',
		'#FF8042',
		'#81e7bb',
		'#c15fff',
		'#510b34',
		'#02f1a2',
		'#c6615d',
		'#29543d',
		'#98be65',
		'#da1a88',
	]

	useEffect(() => {
		if (list) {
			let innerData = null
			let outerData = null
			let byCategory = {
				Income: 0,
				Housing: 0,
				Transportation: 0,
				Food: 0,
				Utilities: 0,
				Personal: 0,
				Entertainment: 0,
				Insurance: 0,
				Education: 0,
				Debt: 0,
				Giving: 0,
				Saving: 0,
			}

			list.forEach(item => {
				if (item.category !== 'Income') {
				}
			})
		}
		return () => {}
	}, [list])

	const data01 = [
		{ name: 'Pruba', value: 400, color: '#0088FE' },
		{ name: 'Group B', value: 300, color: '#00C49F' },
		{ name: 'Group C', value: 300, color: '#FFBB28' },
		{ name: 'Group D', value: 200, color: '#FF8042' },
	]
	const data02 = [
		{ name: 'Prueba- jdsajs', value: 100, color: '#0088FE' },
		{ name: 'A2', value: 300, color: '#0088FE' },
		{ name: 'B1', value: 100, color: '#0088FE' },
		{ name: 'B2', value: 80, color: '#00C49F' },
		{ name: 'B3', value: 40, color: '#00C49F' },
		{ name: 'B4', value: 30, color: '#FFBB28' },
		{ name: 'B5', value: 50, color: '#FFBB28' },
		{ name: 'C1', value: 100, color: '#FFBB28' },
		{ name: 'C2', value: 200, color: '#FF8042' },
		{ name: 'D1', value: 150, color: '#FF8042' },
		{ name: 'D2', value: 50, color: '#FF8042' },
		{ name: 'D2', value: 50, color: '#FF8042' },
	]
	return (
		<Fragment>
			<Grid item xs={12} md={8} lg={9}>
				<Paper item className={fixedHeightPaper}>
					<PieChart width={400} height={400}>
						<Pie
							data={data01}
							isAnimationActive={true}
							dataKey='value'
							cx='50%'
							cy='50%'
							outerRadius={50}
							fill='#8884d8'
							label
						>
							{data01.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip />
						<Pie
							data={data02}
							dataKey='value'
							cx='50%'
							cy='50%'
							innerRadius={100}
							outerRadius={130}
							fill='#82ca9d'
							label
						>
							{data02.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip />
						<Legend />
						{/* <Sector /> */}
					</PieChart>
				</Paper>
			</Grid>
		</Fragment>
	)
}

export default PieGraph
