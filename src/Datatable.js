
function Datatime(props) {
    const serchTime = (timetable, hour, minute) => {
        if (timetable[hour] === undefined) return;

        const nearMinute = timetable[hour].find(v => minute <= v);
        if (nearMinute === undefined) {
            return serchTime(timetable, hour + 1, 0);
        } else {
            return `${hour}:${nearMinute.toString().padStart(2, 0)}`
        }
    };


    return (
        <ul>
            次のバスは
            <li>
                {serchTime}です
            </li>
        </ul>
    )
}
export default Datatime;