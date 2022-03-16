function Datatime(props) {
    const data = require('./timetable/bus_AtoY.json');
    const Daiadata = require('./timetable/bus_calendar.json');

    const [hour, minute] = props.start.split(":").map(Number);
    const Daia = Daiadata[props.date.getMonth() + 1][props.date.getDate() - 1];
    const day = props.date.getDay();
    const Horiday = props.isHoliday;
    
    const check_h = (day, date) => {
        if (date) {
            return 2;
        } else if (day === 5) {
            return 1;
        } else {
            return 0;
        }
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
    const bustime = serchTime(data[Daia], hour, minute).split(":");
    
    if (Daia < 3) {
        return (
            <div>
            <li>
                最速バス出発時間
                {serchTime(data[Daia], hour, minute)}
                </li>
                <li>
                電車時刻表
                {serchTime(trainData ,Number(bustime[0]),Number(bustime[1]))}
                </li>
            </div>
        )
    }else {
        return (
            <div>
            <li>
                本日は運休です
            </li>
            <li>
                    電車時刻表
                {serchTime(trainData ,hour, minute)}
                </li>
            </div>
        )
    }
}


export default Datatime;
