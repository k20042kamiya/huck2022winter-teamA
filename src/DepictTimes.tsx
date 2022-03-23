import React from "react";
import CalcBusTrainTime from "./CalcBusTrainTime";

function DepictTimes(props: Parameters<typeof CalcBusTrainTime>[0]) {
    const { busTime, trainTime, status } = CalcBusTrainTime(props);

    return (<div id="time-list">
        <div className="time-item">
            <div className="traintime-head">次に来る電車は</div>
            <div className="traintime-data">13:05</div>
            <div className="traintime-tail">です</div>
            <div className="bustime-data">12:34</div>
            <div className="bustime-data">12:39</div>
            <div className="bustime-data">12:56</div>
        </div>
        <div className="time-item">
            <div className="traintime-head">次に来る電車は</div>
            <div className="traintime-data">13:05</div>
            <div className="traintime-tail">です</div>
            <div className="bustime-data">12:34</div>
            <div className="bustime-data">12:39</div>
            <div className="bustime-data">12:56</div>
        </div>
        <div className="time-item">
            <div className="traintime-head">次に来る電車は</div>
            <div className="traintime-data">13:05</div>
            <div className="traintime-tail">です</div>
            <div className="bustime-data">12:34</div>
            <div className="bustime-data">12:39</div>
            <div className="bustime-data">12:56</div>
        </div>
    </div>);
}

export default DepictTimes;
