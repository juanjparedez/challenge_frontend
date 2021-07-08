import { red, grey } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			main: grey[900],
		},
		secondary: {
			main: grey[600],
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#fff',
		},
	},
})

export default theme
