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

	// const ColorsByCat = new Map(
	// 	['Income', '#0088FE'],
	// 	['Housing', '#00C49F'],
	// 	['Transportation', '#FFBB28'],
	// 	['Food', '#FF8042'],
	// 	['Utilities', '#81e7bb'],
	// 	['Personal', '#c15fff'],
	// 	['Entertainment', '#510b34'],
	// 	['Insurance_HealthCare', '#02f1a2'],
	// 	['Education', '#c6615d'],
	// 	['Debt_Payments', '#29543d'],
	// 	['Giving', '#98be65'],
	// 	['Saving', '#da1a88']
	// )

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
			let innerData = []
			let outerData = []
			let byCategory = new Map()
			let bySubCategory = new Map()
			list.sort((a, b) => {
				let ca = a.category.toLowerCase(),
					cb = b.category.toLowerCase()

				if (ca < cb) {
					return -1
				}
				if (ca > cb) {
					return 1
				}
				return 0
			})

			list.forEach((item, index) => {
				if (item.category !== 'Income') {
					// console.log('------------------')
					// console.log(item.category)
					if (byCategory.has(item.category) === true) {
						let value = byCategory.get(item.category)
						// console.log({ value })
						value.value = value.value + item.amount * -1
						byCategory.set(item.category, value)
					} else {
						// console.log('No hay dentro de byCategory')
						byCategory.set(item.category, {
							value: item.amount * -1,
							color: COLORS[index],
						})
					}
					if (bySubCategory.has(item.subcategory) === true) {
						let value = bySubCategory.get(item.subcategory)
						value.value = value.value + item.amount * -1
						bySubCategory.set(item.subcategory, value)
					} else {
						bySubCategory.set(item.subcategory, {
							value: item.amount * -1,
							color: byCategory.get(item.category).color,
						})
					}
				}
			})

			// console.log({ byCategory })
			let index = 0
			byCategory.forEach((value, name) => {
				innerData.push({
					value: value.value,
					name,
					index,
					color: value.color,
				})
				index += 1
			})

			// console.log({ bySubCategory })
			let indexS = 0
			bySubCategory.forEach((value, name) => {
				outerData.push({
					value: value.value,
					name,
					indexS,
					color: value.color,
				})
				indexS += 1
			})
			// console.log({ outerData })
			setInnerData(innerData)
			setOuterData(outerData)
		}
		return () => {}
	}, [list])

	return (
		<Fragment>
			<Grid item xs={12} md={8} lg={9}>
				<Paper className={fixedHeightPaper}>
					{innerData && outerData && (
						<PieChart width={400} height={400}>
							<Pie
								data={innerData}
								isAnimationActive={true}
								dataKey='value'
								cx='50%'
								cy='50%'
								outerRadius={50}
								// fill='#8884d8'
								label
							>
								{innerData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
							<Pie
								data={outerData}
								dataKey='value'
								cx='50%'
								cy='50%'
								innerRadius={100}
								outerRadius={130}
								// fill='#82ca9d'
								label
							>
								{outerData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
							{/* <Legend /> */}
							{/* <Sector /> */}
						</PieChart>
					)}
				</Paper>
			</Grid>
		</Fragment>
	)
}

export default PieGraph
