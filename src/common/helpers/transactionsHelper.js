const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        const date = transaction.date.split("T")[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});
};

export { groupTransactionsByDate }