import React from "react";
import {
    getFirstDayOfThisMonth,
    getLastDayOfThisMonth,
    getFirstDayOfPrevMonth,
    getLastDayOfPrevMonth,
    formatDate,
} from "../../common/helpers/dateHelper.js";

const formatPolishDate = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${d}.${m}.${y}`;
};

const DashboardDateRange = ({
                                dateRangeOption,
                                setDateRangeOption,
                                startDate,
                                setStartDate,
                                endDate,
                                setEndDate,
                            }) => {
    const handleDateRangeOptionChange = (option) => {
        setDateRangeOption(option);
        if (option === "thisMonth") {
            setStartDate(getFirstDayOfThisMonth());
            setEndDate(getLastDayOfThisMonth());
        } else if (option === "prevMonth") {
            setStartDate(getFirstDayOfPrevMonth());
            setEndDate(getLastDayOfPrevMonth());
        }
    };

    return (
        <div className="date-range-section disable-selection">
            <div className="analytics-radio-group">
                <label className="analytics-radio-label">
                    <input
                        type="radio"
                        name="dateRange"
                        value="thisMonth"
                        checked={dateRangeOption === "thisMonth"}
                        onChange={() => handleDateRangeOptionChange("thisMonth")}
                    />
                    This month
                </label>

                <label className="analytics-radio-label">
                    <input
                        type="radio"
                        name="dateRange"
                        value="prevMonth"
                        checked={dateRangeOption === "prevMonth"}
                        onChange={() => handleDateRangeOptionChange("prevMonth")}
                    />
                    Previous month
                </label>

                <label className="analytics-radio-label">
                    <input
                        type="radio"
                        name="dateRange"
                        value="custom"
                        checked={dateRangeOption === "custom"}
                        onChange={() => handleDateRangeOptionChange("custom")}
                    />
                    Custom range
                </label>
            </div>

            {dateRangeOption === "custom" && (
                <div className="analytics-date-range" style={{marginTop: "10px"}}>
                    <label style={{marginRight: "20px"}}>
                        <span> From: </span>
                        <input
                            className="filter-input date-input"
                            type="date"
                            value={formatDate(startDate)}
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                        />
                    </label>
                    <label>
                        <span> To: </span>
                        <input
                            className="filter-input date-input"
                            type="date"
                            value={formatDate(endDate)}
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={(e) => setEndDate(new Date(e.target.value))}
                        />
                    </label>
                </div>
            )}

            <div style={{marginTop: "25px", color: "#ccc", fontStyle: "italic"}}>
                Selected range:{" "}
                {`${formatPolishDate(startDate)} - ${formatPolishDate(endDate)}`}
            </div>

        </div>
    );
};

export default DashboardDateRange;
