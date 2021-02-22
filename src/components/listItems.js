import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { NavLink } from 'react-router-dom'

// import AssessmentIcon from '@material-ui/icons/Assessment'

export const mainListItems = (
	<div>
		<ListItem
			button
			component={NavLink}
			to={'/'}
			style={{ color: 'inherit', textDecoration: 'inherit' }}
			activeStyle={{
				fontWeight: 'bold',
				color: 'grey',
				selected: true,
			}}
		>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='Flow' />
		</ListItem>
		<ListItem
			button
			component={NavLink}
			to={'/expenses'}
			textDecoration='none'
			activeStyle={{
				fontWeight: 'bold',
				color: 'red',
			}}
		>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary='Expenses' />
		</ListItem>
		<ListItem
			button
			component={NavLink}
			to={'/incomes'}
			textDecoration='none'
			activeStyle={{
				fontWeight: 'bold',
				color: 'red',
			}}
		>
			<ListItemIcon>
				<AttachMoneyIcon />
			</ListItemIcon>
			<ListItemText primary='Incomes' />
		</ListItem>
		{/* <ListItem
			component={NavLink}
			to={'/first'}
			textDecoration='none'
			activeStyle={{
				fontWeight: 'bold',
				color: 'red',
			}}
		>
			
			<ListItemIcon>
				<AttachMoneyIcon />
			</ListItemIcon>
			FAQs
			
		</ListItem> */}
		{/* <ListItem button>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary='Reports' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary='Integrations' />
		</ListItem> */}
	</div>
)
