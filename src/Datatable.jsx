import CalcBusTrainTime from './CalcBusTrainTime';

function Datatime(props) {
    const data = require('./timetable/bus_AtoY.json');
    const Daiadata = require('./timetable/bus_calendar.json');
    const t = CalcBusTrainTime(props);
    console.log(...t.busTime, '|', ...t.trainTime);

    const [hour, minute] = props.start.split(":").map(Number);
    const Daia = Daiadata[props.date.getMonth() + 1][props.date.getDate() - 1];
    const day = props.date.getDay();
    const Horiday = props.isHoliday;
    const selectedTab = props.selectedTab;
    const check_h = (day, isHoliday) => {
        if (isHoliday) return 2;
        if (day === 5) return 1;
        return 0;
    };
    
    const timetableNamelist = [
        ['train_AikantoO_w.json', 'train_AikantoO_s.json', 'train_AikantoO_h.json'],
        ['train_AikantoK_w.json', 'train_AikantoK_s.json', 'train_AikantoK_h.json'],
        ['train_LinertoF_w.json', 'train_LinertoF_s.json', 'train_LinertoF_h.json']
    ];
    
    const Daiacheck = check_h(day, Horiday);
    const timetableName = timetableNamelist[props.route][Daiacheck];
    const trainData = require(`./timetable/${timetableName}`);

    const serchTime = (timetable, hour, minute, upper = true) => {
        if (upper ? 24 <= hour : hour < 0) return;
        if (timetable[hour] === undefined) return serchTime(timetable, upper ? hour + 1 : hour - 1, upper ? 0 : 59, upper);
        const nearMinute = upper ?
            timetable[hour].find(v => minute <= v) :
            [...timetable[hour]].reverse().find(v => minute >= v);

        if (nearMinute === undefined) {
            return serchTime(timetable, upper ? hour + 1 : hour - 1, upper ? 0 : 59, upper);
        } else {
            return `${hour}:${nearMinute.toString().padStart(2, 0)}`;
        }
    }

    const timeCalc = ([hour, minute], diff) => {
        let aftAllMin = (hour * 60 + minute + diff) % (24 * 60);
        if (aftAllMin < 0) aftAllMin += 24 * 60;
        return [aftAllMin / 60 | 0, aftAllMin % 60];
    }

    const bustimeTable = serchTime(data[Daia], hour, minute);
    const traintimeTable = serchTime(trainData, hour, minute);

    const traincheck = (serchB, serchT) => {
        if (serchT === undefined) return `この時間の電車はありません`;
        if (serchB === undefined) return serchT;

        const Daia = timeCalc(serchB.split(':').map(Number), 10);
        return serchTime(trainData, Daia[0], Daia[1]);
    }

    const bustime = (selectedTab, serchB, serchT) => {
        if (selectedTab === `0`) {
            return serchB ?? 'この時間のバスはありません';
        }
        if (selectedTab === `1`) {
            if (serchB === undefined) return 'この時間のバスはありません';
            else if (serchT === undefined) return serchB;
            else {
                const bus = timeCalc(serchB.split(':').map(Number), 10);
                const train = (serchTime(trainData, bus[0], bus[1]).split(":").map(Number));
                const time = timeCalc(train, -10);
                return serchTime(data[Daia], time[0], time[1], false);
            }
        }
    }

    if (Daia === 3) {
        return (
            <li>
                <div className="rest_label">本日は運休です</div>
                <div className='train_label'>電車時刻表</div>
                <div className="train_data">{traintimeTable}</div>
            </li>
        );
    } else {
        return (
            <li className='list_item'>
                <div className='bustime_label'>適正バス出発時間</div>
                <div className="bustime_data">{bustime(selectedTab, bustimeTable, traintimeTable)}</div>
                <div className='train_label'>最速電車出発時間</div>
                <div className="train_data">{traincheck(bustimeTable, traintimeTable)}</div>
            </li>
        );
    }
}

export default Datatime;
