const generateDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date).toISOString().split("T")[0]); // YYYY-MM-DD
        date.setDate(date.getDate() + 1);
    }
    return days;
};

export { generateDaysInMonth };