export default (state, action) => {
	switch (action.type) {
		case 'REMOVE_TRANSACTION':
			return {
				...state,
				transactions: state.transactions.filter(
					transaction => transaction.id !== action.payload
				),
			}
		case 'ADD_TRANSACTIONS':
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			}
		case 'EDIT_TRANSACTION':
			const updatedTransaction = action.payload

			const updatedTransactions = state.transactions.map(transaction => {
				if (transaction.id === updatedTransaction.id) {
					return updatedTransaction
				}
				return transaction
			})

			return {
				...state,
				transactions: updatedTransactions,
			}
		default:
			return state
	}
}
