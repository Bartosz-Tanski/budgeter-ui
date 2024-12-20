import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import React from "react";

const LimitOverviewProgressbar = ({percentage}) => {
    return (<CircularProgressbar
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
                trailColor: "#1f1f1f",
            })}
        />
    )
}

export default LimitOverviewProgressbar;