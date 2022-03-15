function Datatime(props) {
    const data = require('./timetable/bus_AtoY.json');
    const splitTime = props.start.split(":");
    const hour = parseInt(splitTime[0],10);
    const minute = parseInt(splitTime[1], 10); 
    console.log(minute)
    const serchTime = (timetable, hour, minute) => {
        if (timetable[hour] === undefined) return;

        const nearMinute = timetable[hour].find(v => minute <= v);
    
        if (nearMinute === undefined) {
            return serchTime(timetable, hour + 1, 0);
        } else {
            return `${hour}:${nearMinute.toString().padStart(2, 0)}`
        }
    }
    // console.log(serchTime(data, hour, minute))

    return (
        <ul>
            次のバスは
            <li>
                {serchTime(data[0], hour, minute)}です
            </li>
        </ul>
    )
}

export default Datatime;