import React, { useContext, useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles, useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { GlobalContext } from '../context/GlobalState'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FilledInput from '@material-ui/core/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

const useModalStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	textFields: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	button: {
		margin: theme.spacing(1),
	},
	buttonGroup: {
		marginTop: theme.spacing(2),
	},
}))

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
}))

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	modalPaper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}))

const headCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Name',
	},
	{ id: 'id', numeric: true, disablePadding: false, label: 'ID' },
	{
		id: 'description',
		numeric: false,
		disablePadding: true,
		label: 'Description',
	},
	{ id: 'amount', numeric: true, disablePadding: false, label: 'Amount ($)' },
	{
		id: 'category',
		numeric: false,
		disablePadding: true,
		label: 'Category',
	},
	{
		id: 'subcategory',
		numeric: false,
		disablePadding: true,
		label: 'Subcategory',
	},
]

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

const categories = [
	'Income',
	'Housing',
	'Transportation',
	'Food',
	'Utilities',
	'Personal',
	'Entertainment',
	'Insurance_HealthCare',
	'Education',
	'Debt_Payments',
	'Giving',
	'Saving',
]

const subCategories = new Map([
	[
		'Income',
		[
			'Salary',
			'BonusesCommission',
			'InvestmentIncome',
			'InterestIncome',
			'SideHustleIncome',
			'ChildSupport',
			'Alimony',
			'CreditCardRewards',
		],
	],
	[
		'Housing',
		[
			'Mortgage',
			'Rent',
			'PropertyTaxes',
			'HomeownerInsurance',
			'HomeMaintenanceRepairs',
			'HomeImprovement',
		],
	],
	[
		'Transportation',
		[
			'CarPayment',
			'CarMaintenanceRepairs',
			'CarInsurance',
			'Fuel',
			'PublicTransportation',
			'RideSharing',
			'Tolls',
			'ParkingFees',
			'VehicleRegistrationInspection',
		],
	],
	['Food', ['Groceries', 'Restaurants', 'WorkLunches', 'TakeOut', 'FastFood']],
	[
		'Utilities',
		[
			'Electricity',
			'Water',
			'NaturalGas',
			'GarbageCollection',
			'Phone',
			'Cable',
			'Internet',
		],
	],
	[
		'Personal',
		[
			'Clothing',
			'Shoes',
			'PersonalHygiene',
			'HouseholdSupplies',
			'ChildCare',
			'HairCuts',
			'GymMembership',
			'HomeFurnishings',
		],
	],
	[
		'Entertainment',
		[
			'MoviesEvents',
			'SubscriptionServices',
			'Vacations',
			'Hobbies',
			'DateNights',
		],
	],
	[
		'Insurance_HealthCare',
		[
			'HealthInsurance',
			'DentalInsurance',
			'VisionInsurance',
			'LifeInsurance',
			'DisabilityInsurance',
			'PrescriptionsMedicines',
			'OutHealthcareExpenses',
		],
	],
	[
		'Education',
		[
			'Tuition',
			'ExtracurricularActivities',
			'Books',
			'SchoolSupplies',
			'Uniforms',
			'Registration',
			'OtherFees',
		],
	],
	[
		'Debt_Payments',
		['StudentLoans', 'CreditCards', 'PersonalLoans', 'InstallmentLoans'],
	],
	['Giving', ['Religious', 'Charities', 'Gifts']],
	[
		'Saving',
		['RetirementAccounts', 'EmergencyFund', 'EducationFund', 'SinkingFund'],
	],
])

function getStyles(category, categoryName, theme) {
	return {
		fontWeight:
			categoryName.indexOf(category) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	}
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align='center'
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
}

function rand() {
	return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
	const top = 50 + rand()
	const left = 50 + rand()

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}

const EnhancedTableToolbar = props => {
	const classes = useToolbarStyles()
	const { numSelected } = props

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color='inherit'
					variant='subtitle1'
					component='div'
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant='h6'
					id='tableTitle'
					component='div'
				>
					Incomes
				</Typography>
			)}

			{numSelected === 1 ? (
				<Fragment>
					<Tooltip title='Edit'>
						<IconButton aria-label='edit'>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete'>
						<IconButton aria-label='delete'>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Fragment>
			) : numSelected > 1 ? (
				<Tooltip title='Delete'>
					<IconButton aria-label='delete'>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Filter list'>
					<IconButton aria-label='filter list'>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	)
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
}

export default function EnhancedTable() {
	const { loading, list } = useContext(GlobalContext)
	const [totalAmount, setTotalAmount] = useState(null)
	const [totalIncome, setTotalIncome] = useState(null)
	const [totalOutcome, setTotalOutcome] = useState(null)
	const [filteredList, setFilteredList] = useState(null)
	const classes = useStyles()
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('id')
	const [selected, setSelected] = useState([])
	const [page, setPage] = useState(0)
	const [dense, setDense] = useState(true)
	const [rowsPerPage, setRowsPerPage] = useState(25)
	const Modalclasses = useModalStyles()
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle)
	const [openModal, setOpenModal] = useState(false)
	const theme = useTheme()
	const [category, setCategory] = useState('')
	const [subcategory, setSubcategory] = useState('')
	const [subCatList, setSubCatList] = useState([])
	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	})

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleOpenModal = () => {
		setOpenModal(true)
	}

	const handleCloseModal = () => {
		setOpenModal(false)
	}

	const handleChangeCat = event => {
		setCategory(event.target.value)
		// console.log(subCategories.get(event.target.value))
		setSubCatList(subCategories.get(event.target.value))
	}

	const handleChangeSubCat = event => {
		setSubcategory(event.target.value)
	}

	const body = (
		<div style={modalStyle} className={Modalclasses.paper}>
			<Grid container direction='column' justify='center' alignItems='center'>
				<form noValidate autoComplete='off' className={Modalclasses.textFields}>
					<TextField id='outlined-basic' label='Name' variant='outlined' />
					<TextField
						id='outlined-basic'
						label='Description'
						variant='outlined'
					/>
					<FormControl variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
						<OutlinedInput
							id='outlined-adornment-amount'
							value={values.amount}
							onChange={handleChange('amount')}
							startAdornment={
								<InputAdornment position='start'>$</InputAdornment>
							}
							labelWidth={60}
						/>
					</FormControl>
					<FormControl className={Modalclasses.formControl}>
						<InputLabel id='category'>Category</InputLabel>
						<Select
							labelId='category'
							id='category'
							// multiple
							value={category}
							onChange={handleChangeCat}
							input={<Input />}
							MenuProps={MenuProps}
						>
							{categories.map(category => (
								<MenuItem
									key={category}
									value={category}
									style={getStyles(category, category, theme)}
								>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl className={Modalclasses.formControl}>
						<InputLabel id='SubCategory'>SubCategory</InputLabel>
						<Select
							labelId='SubCategory'
							id='SubCategory'
							// multiple
							value={subcategory}
							onChange={handleChangeSubCat}
							input={<Input />}
							MenuProps={MenuProps}
						>
							{subCatList.map(subCategory => (
								<MenuItem
									key={subCategory}
									value={subCategory}
									style={getStyles(subCategory, subCategory, theme)}
								>
									{subCategory}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<div className={Modalclasses.buttonGroup}>
						<Button
							variant='contained'
							color='secondary'
							className={Modalclasses.button}
							// startIcon={<DeleteIcon />}
						>
							Cancel
						</Button>
						{/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
						<Button
							variant='contained'
							color='primary'
							className={Modalclasses.button}
							// endIcon={<Icon>send</Icon>}
						>
							Send
						</Button>
					</div>
				</form>
			</Grid>
		</div>
	)

	const fab = {
		color: 'primary',
		className: classes.fab,
		icon: <AddIcon />,
		label: 'Add',
	}

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
			let filteredList = list.filter(el => {
				if (el.category === 'Income') {
					return true
				}
			})

			// console.log({ filteredList })
			setFilteredList(filteredList)
			setTotalAmount(totalAmount)
			setTotalIncome(totalIncome)
			setTotalOutcome(totalOutcome * -1)
			return () => {}
		}
	}, [list])

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelecteds = filteredList.map(n => n.name)
			setSelected(newSelecteds)
			return
		}
		setSelected([])
	}

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const isSelected = name => selected.indexOf(name) !== -1

	const emptyRows = 0
	return (
		<Fragment>
			<div className={classes.root}>
				{filteredList && (
					<Paper className={classes.paper}>
						<EnhancedTableToolbar numSelected={selected.length} />
						<TableContainer>
							<Table
								className={classes.table}
								aria-labelledby='tableTitle'
								size={dense ? 'small' : 'medium'}
								aria-label='enhanced table'
							>
								<EnhancedTableHead
									classes={classes}
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={filteredList.length}
								/>
								<TableBody>
									{stableSort(filteredList, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row.name)
											const labelId = `enhanced-table-checkbox-${index}`

											return (
												<TableRow
													hover
													onClick={event => handleClick(event, row.name)}
													role='checkbox'
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={row.name}
													selected={isItemSelected}
												>
													<TableCell padding='checkbox'>
														<Checkbox
															checked={isItemSelected}
															inputProps={{ 'aria-labelledby': labelId }}
														/>
													</TableCell>
													<TableCell
														component='th'
														id={labelId}
														scope='row'
														padding='none'
													>
														{row.name}
													</TableCell>
													<TableCell align='right'>{row.id}</TableCell>
													<TableCell align='right'>{row.description}</TableCell>
													<TableCell align='right'>{row.amount}</TableCell>
													<TableCell align='right'>{row.category}</TableCell>
													<TableCell align='right'>{row.subcategory}</TableCell>
												</TableRow>
											)
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={filteredList.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>

						<Fab
							aria-label={fab.label}
							className={fab.className}
							color={fab.color}
							onClick={handleOpenModal}
						>
							{fab.icon}
						</Fab>
					</Paper>
				)}
			</div>
			<div>
				<Modal
					open={openModal}
					onClose={handleCloseModal}
					aria-labelledby='simple-modal-title'
					aria-describedby='simple-modal-description'
				>
					{body}
				</Modal>
			</div>
		</Fragment>
	)
}
