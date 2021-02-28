import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
}))

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

export default function MultipleSelect() {
	const classes = useStyles()
	const theme = useTheme()
	const [category, setCategory] = useState('')
	const [subcategory, setSubcategory] = useState('')
	const [subCatList, setSubCatList] = useState([])

	const handleChangeCat = event => {
		setCategory(event.target.value)
		// console.log(subCategories.get(event.target.value))
		setSubCatList(subCategories.get(event.target.value))
	}

	const handleChangeSubCat = event => {
		setSubcategory(event.target.value)
	}

	return (
		<div>
			<FormControl className={classes.formControl}>
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
			<FormControl className={classes.formControl}>
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
		</div>
	)
}
