function Datatime(props) {
    const data = require('./timetable/bus_AtoY.json');
    const Daiadata = require('./timetable/bus_calendar.json');

    const [hour, minute] = props.start.split(":").map(Number);
    const Daia = Daiadata[props.date.getMonth() + 1][props.date.getDate() - 1];
    const day = props.date.getDay();
    const Horiday = props.isHoliday;

    const check_h = (day, isHoliday) => {
        if (isHoliday) return 2;
        if (day === 5) return 1;
        return 0;
    };

    const Daiacheck = check_h(day, Horiday);

    const timetableNamelist = [
        ['train_AikantoK_w.json', 'train_AikantoK_s.json', 'train_AikantoK_h.json'],
        ['train_AikantoO_w.json', 'train_AikantoO_s.json', 'train_AikantoO_h.json'],
        ['train_LinertoF_w.json', 'train_LinertoF_s.json', 'train_LinertoF_h.json']
    ];

    const timetableName = timetableNamelist[props.route][Daiacheck];
    const trainData = require(`./timetable/${timetableName}`);


    const serchTime = (timetable, hour, minute, upper = true) => {
        if (timetable[hour] === undefined) return;
        const nearMinute = timetable[hour].find(v => upper ? minute <= v : minute >= v);

        if (nearMinute === undefined) {
            return serchTime(timetable, upper ? hour + 1 : hour - 1, upper ? 0 : 59);
        } else {
            return `${hour}:${nearMinute.toString().padStart(2, 0)}`
        }
    }
    const bustimeTable = serchTime(data[Daia], hour, minute)
    const traintimeTable =  serchTime(trainData, hour, minute)


    const checkBus = (serchTime) => {
        if (serchTime === undefined) {
            return `この時間のバスはありません`
        }
        else {
            return serchTime
        }
    }

    const traincheck = (serchB, serchT) => {
        if (serchT === undefined) 
            return`電車はありません`
         if (serchB === undefined) {
            if (serchT === undefined) 
                return `電車はありません`
             else {
                return serchT
            }
        } else {
            const Daia = serchB.split(':');
                return serchTime(trainData,Number(Daia[0]),Number(Daia[1]+10))
        }
    }

    const bustime = checkBus(bustimeTable)

    if (Daia < 3) {
        return (
            <li className='list_item'>
                <div className='bustime_label'>最速バス出発時間</div>
                <div className="bustime_data">{bustime}</div>
                <div className='train_label'>電車時刻表</div>
                <div className="train_data">{traincheck(bustimeTable,traintimeTable)}</div>
            </li>
        )
    } else {
        return (
            <li>
                <div className="rest_label">本日は運休です</div>
                <div className='train_label'>電車時刻表</div>
                <div className="train_data">{traintimeTable}</div>
            </li>
        )
    } 
}


export default Datatime;
