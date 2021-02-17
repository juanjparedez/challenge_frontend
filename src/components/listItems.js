import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { useHistory, NavLink } from 'react-router-dom'
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
		<ListItem button>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary='Expenses' />
		</ListItem>
		<ListItem button>
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

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Current month' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Last quarter' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Year-end sale' />
		</ListItem>
	</div>
)
