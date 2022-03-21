import CalcBusTrainTime from "./CalcBusTrainTime";

function main(props) {
    const { busTime, trainTime, status } = CalcBusTrainTime(props);
    
    if (status === 1) return (<div className="item">
        <div className="suspencion">本日は運休です</div>
    </div>);

    if (busTime === undefined && trainTime === undefined) {
        return (<div className="item">
            <div className="noTrain">今日の電車はもうありません</div>
        </div>);
    }

    if (busTime !== undefined) {
        <div className="main">今日のバスはもうありません</div>
    }
}

export default main;
