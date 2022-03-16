function Datatime(props) {
    const data = require('./timetable/bus_AtoY.json');
    const Daiadata = require('./timetable/bus_calendar.json');
    const AikantoK_h = require('./timetable/train_AikantoK_h.json');
    const AikantoK_s = require('./timetable/train_AikantoK_s.json');
    const AikantoK_w = require('./timetable/train_AikantoK_w.json');
    const AikantoO_h = require('./timetable/train_AikantoO_h.json');
    const AikantoO_s = require('./timetable/train_AikantoO_s.json');
    const AikantoO_w = require('./timetable/train_AikantoO_w.json');
    const LinimotoF_h = require('./timetable/train_LinertoF_h.json');
    const LinimotoF_s = require('./timetable/train_LinertoF_s.json');
    const LinimotoF_w = require('./timetable/train_LinertoF_w.json');

    const splitTime = props.start.split(":");
    const hour = parseInt(splitTime[0], 10);
    const minute = parseInt(splitTime[1], 10);
    const date = parseInt(props.date.getDate() - 1, 10);
    const month = parseInt(props.date.getMonth() + 1, 10);
    const Daia = Daiadata[month][date];
    const trainDaia_h = [AikantoK_h, AikantoO_h, LinimotoF_h]
    console.log(trainDaia_h);
    console.log(date)
    console.log(month)
    
    const serchTime = (timetable, hour, minute) => {
        if (timetable[hour] === undefined) return;
        const nearMinute = timetable[hour].find(v => minute <= v);

        if (nearMinute === undefined) {
            return serchTime(timetable, hour + 1, 0);
        } else {
            return `${hour}:${nearMinute.toString().padStart(2, 0)}`
        }
    }
    console.log(serchTime(data[Daia], hour, minute))
    const bustime = serchTime(data[Daia], hour, minute).split(":")

    // const train_check = (route) => {
    //     for (const d in trainDaia_h) {
    //         if (Daia < 3) {
    //             if (Number(route) === trainDaia_h.indexOf(d)) {
    //                 return serchTime(trainDaia_h.indexOf(d), hour, bustime[1] + 10)
    //             }
    //         } else {
    //             return serchTime(trainDaia_h[route], hour, minute)
    //         }
    //     }
    // }

    const train_check = (route) => {
        for (let i = 0; i < trainDaia_h.length; i++) {
            if (Daia < 3 && Number(route) === i) {
                    return serchTime(trainDaia_h[i],Number(bustime[0]), Number(bustime[1]) + 10)
            } else {
                return "ok"
                //  return serchTime(trainDaia_h[route], hour, minute)
            }
        }
        
    }

    console.log(typeof(bustime[1]))
    if (Daia < 3) {
        return (
            <div>
            <li>
                最速バス出発時間
                {serchTime(data[Daia], hour, minute)}
            </li>
            <li>
                    電車時刻表
                {train_check(props.route)}
                </li>
            </div>

        )
    }else {
        return (
            <div>
                <li>
                本日は運休です
                電車時刻表 {train_check(props.route)}
            </li>
            </div>
       
        )
    }
}

    // console.log(serchTime(data, hour, minute))
export default Datatime;