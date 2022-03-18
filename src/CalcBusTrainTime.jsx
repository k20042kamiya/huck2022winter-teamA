function CalcBusTrainTime(props) {
    const busCalendar = require('./timetable/bus_calendar.json');
    const busTimetableList = require('./timetable/bus_AtoY.json');

    const timetableNamelist = [
        ['train_AikantoO_w.json', 'train_AikantoO_s.json', 'train_AikantoO_h.json'],
        ['train_AikantoK_w.json', 'train_AikantoK_s.json', 'train_AikantoK_h.json'],
        ['train_LinertoF_w.json', 'train_LinertoF_s.json', 'train_LinertoF_h.json']
    ];
    const busDuring = [0, 10];

    const { start: start_string, date, isHoliday, selectedTab, route } = props;
    const start = start_string.split(":").map(Number);
    const busDiaMode = busCalendar[date.getMonth() + 1][date.getDate() - 1];
    const busTimetable = busTimetableList[busDiaMode];

    const trainDiaMode = isHoliday ? 2 : (date.getDay() === 5 ? 1 : 0);
    const timetableName = timetableNamelist[route][trainDiaMode];
    const trainTimetable = require(`./timetable/${timetableName}`);

    const mostfastBusTime = serchTime(busTimetable, start);
    const mostfastTrainTime = serchTime(
        trainTimetable,
        mostfastBusTime !== undefined ? timeCalc(mostfastBusTime, busDuring) : start
    );

    if (selectedTab === '0' || mostfastBusTime === undefined) return {
        busTime: mostfastBusTime,
        trainTime: mostfastTrainTime
    }

    const mostslowBusTime = serchTime(
        busTimetable,
        timeCalc(mostfastTrainTime, busDuring.map(v => -v)),
        false
    );

    return {
        busTime: mostslowBusTime,
        trainTime: mostfastTrainTime
    }
}

function serchTime(timetable, [hour, minute], upper = true) {
    const forcusTime = timetable[hour] ?? [];
    const nearMinute = upper ?
        forcusTime.find(v => minute <= v) :
        [...forcusTime].reverse().find(v => minute >= v);

    if (nearMinute === undefined) {
        const nextTime = [upper ? hour + 1 : hour - 1, upper ? 0 : 59];
        if (0 <= nextTime[0] && nextTime[0] < 24) return serchTime(timetable, nextTime, upper);
    } else {
        return [hour, nearMinute];
    }
}

function timeCalc([hour, minute], [diffHour, diffMinute]) {
    let aftAllMin = (hour * 60 + minute + diffHour * 60 + diffMinute) % (24 * 60);
    if (aftAllMin < 0) aftAllMin += 24 * 60;
    return [aftAllMin / 60 | 0, aftAllMin % 60];
}

export default CalcBusTrainTime;
