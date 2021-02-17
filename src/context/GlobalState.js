import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const GlobalContext = createContext({})

export const GlobalProvider = ({ children }) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)

	const getDataFromAPI = async () => {
		setLoading(true)
		const newText = await axios.get('/api/flow')
		const info = await newText.data
		// console.log({ info })
		setData(info)
		setLoading(false)
	}
	useEffect(() => {
		getDataFromAPI()
	}, [])

	return (
		<GlobalContext.Provider value={{ loading, list: data }}>
			{children}
		</GlobalContext.Provider>
	)
}
