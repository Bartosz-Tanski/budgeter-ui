export const generateDaysInMonth = (year, month) => {
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

export function getFirstDayOfThisMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
}
export function getLastDayOfThisMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
}

export function getFirstDayOfPrevMonth() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return firstDay;
}
export function getLastDayOfPrevMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 0);
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}