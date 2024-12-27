import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const LimitProgressBar = ({ percentage }) => {
    return (
        <div className="limit-progress-bar">
            <CircularProgressbar
                value={percentage}
                text={`${percentage.toFixed(1)}%`}
                styles={buildStyles({
                    pathColor:
                        percentage > 80
                            ? "#f44336"
                            : percentage > 50
                                ? "#ff9800"
                                : "#4caf50",
                    textColor: "#00bcd4",
                    trailColor: "#333",
                })}
            />
        </div>
    );
};

export default LimitProgressBar;
