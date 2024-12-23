const generateDaysInMonth = (year, month) => {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date).toISOString().split("T")[0]); // YYYY-MM-DD
        date.setDate(date.getDate() + 1);
    }
    return days;
};

export function getDefaultStartDate() {
    const now = new Date();
    now.setDate(1);
    return now.toISOString().split("T")[0];
}

export function getDefaultEndDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const lastDay = new Date(year, month + 1, 0);

    return lastDay.toISOString().split("T")[0];
}

export function getTodayDate() {
    const now = new Date();
    return now.toISOString().split("T")[0];
}

export { generateDaysInMonth };