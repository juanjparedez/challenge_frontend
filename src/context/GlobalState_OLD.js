import React, { createContext, useReducer, useState, useEffect } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
	transactions: [{}],
}

export const GlobalContext = createContext(initialState)
export const GlobalProvider = ({ children }) => {
	const [transactions, setTransactions] = useState({})

	const getDataFromAPI = async () => {
		let transactions = await axios.get('/api/flow')
		let data = await transactions.data
		// console.log({ data })
		// setData({ transactions: data })
		return data
	}
	const setDatafromAPI = async () => {
		let data = await getDataFromAPI()
		setTransactions(data)
		initialState.transactions = data
	}

	useEffect(() => {
		setDatafromAPI()
		return () => {}
	}, [])

	const [state, dispatch] = useReducer(AppReducer, initialState)

	function removeTransaction(id) {
		dispatch({
			type: 'REMOVE_TRANSACTION',
			payload: id,
		})
	}

	function addTransaction(transactions) {
		dispatch({
			type: 'ADD_TRANSACTIONS',
			payload: transactions,
		})
	}

	function editTransaction(transactions) {
		dispatch({
			type: 'EDIT_TRANSACTION',
			payload: transactions,
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				removeTransaction,
				addTransaction,
				editTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
