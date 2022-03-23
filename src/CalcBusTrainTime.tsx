type Props = {
    start: string,
    date: Date,
    isHoliday: boolean,
    selectedTab: string,
    route: string
};

type Time = [number, number];
type Timetable = Record<number, number[]>;

function CalcBusTrainTime(props: Props) {
    const busCalendar: Timetable = require('./timetable/bus_calendar.json');
    const busTimetableList: Timetable[] = require('./timetable/bus_AtoY.json');

    const timetableNamelist = [
        ['train_AikantoO_w.json', 'train_AikantoO_s.json', 'train_AikantoO_h.json'],
        ['train_AikantoK_w.json', 'train_AikantoK_s.json', 'train_AikantoK_h.json'],
        ['train_LinertoF_w.json', 'train_LinertoF_s.json', 'train_LinertoF_h.json']
    ];
    const busDuring = [0, 10] as Time;

    const { start: start_string, date, isHoliday, selectedTab, route } = props;
    const start = start_string.split(":").map(Number) as Time;
    const busDiaMode = busCalendar[date.getMonth() + 1][date.getDate() - 1];
    if (busDiaMode === 3) return { status: 0 }
    const busTimetable = busTimetableList[busDiaMode];

    const trainDiaMode = isHoliday ? 2 : (date.getDay() === 5 ? 1 : 0);
    const timetableName = timetableNamelist[Number(route)][trainDiaMode];
    const trainTimetable: Timetable = require(`./timetable/${timetableName}`);

    const mostfastBusTime = serchTime(busTimetable, start);
    const mostfastTrainTime = serchTime(
        trainTimetable,
        mostfastBusTime !== undefined ? timeCalc(mostfastBusTime, busDuring) : start
    );

    if (selectedTab === '0' || mostfastBusTime === undefined || mostfastTrainTime === undefined) return {
        busTime: mostfastBusTime,
        trainTime: mostfastTrainTime
    }

    const busTimeList = serchWhile(busTimetable, timeCalc(mostfastBusTime, busDuring.map(v => -v) as Time), mostfastTrainTime);
    console.log('busTimeList: ', busTimeList);
    
    const mostslowBusTime = serchTime(
        busTimetable,
        timeCalc(mostfastTrainTime, busDuring.map(v => -v) as Time),
        false
    );

    return {
        busTime: mostslowBusTime,
        trainTime: mostfastTrainTime
    }
}

function serchTime(timetable: Timetable, [hour, minute]: Time, upper: boolean = true): Time | undefined {
    const forcusTime = timetable[hour] ?? [];
    const nearMinute = upper ?
        forcusTime.find(v => minute <= v) :
        [...forcusTime].reverse().find(v => minute >= v);

    if (nearMinute === undefined) {
        const nextTime = [upper ? hour + 1 : hour - 1, upper ? 0 : 59] as Time;
        if (0 <= nextTime[0] && nextTime[0] < 24) return serchTime(timetable, nextTime, upper);
    } else {
        return [hour, nearMinute];
    }
}

function timeCalc([hour, minute]: Time, [diffHour, diffMinute]: Time): Time {
    let aftAllMin = (hour * 60 + minute + diffHour * 60 + diffMinute) % (24 * 60);
    if (aftAllMin < 0) aftAllMin += 24 * 60;
    return [aftAllMin / 60 | 0, aftAllMin % 60];
}

function serchWhile (timetable: Timetable, start: Time, end: Time) {
    if (start === undefined || end === undefined) return;
    const getAllMin = ([hour, minute]: Time) => hour * 60 + minute;
    const ret = [];
    let currentTime = start;
    while (true) {
        const part = serchTime(timetable, currentTime);
        if (part === undefined || getAllMin(part) > getAllMin(end)) break;
        ret.push(part);
        currentTime = timeCalc(part, [0, 1]);
    }
    return ret;
}

export default CalcBusTrainTime;
