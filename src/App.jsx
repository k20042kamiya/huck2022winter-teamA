import Datatable from './Datatable';
import { useState, useEffect } from 'react'
import getWether from './weather';
import JapaneseHoliday from 'japanese-holidays';

function App() {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, 0)}`;
    const isHoliday = JapaneseHoliday.isHoliday(now);
    const dateText = `${now.getMonth() + 1}月${now.getDate()}日（${getDayName(now, isHoliday)}）`;

    const hcGene = func => (e => func(e.target.value));
    const [routeGet, routeSet] = useState('0');
    const [timeSearchGet, timeSearchSet] = useState(timestamp);
    const [weatherGet, weatherSet] = useState(<></>);

    useEffect(() => {
        getWether().then(ret => weatherSet(ret));
    }, []);

    return (<>
        <header>時刻表</header>
        <div id="today">{ dateText }</div>
        <select name="route" id="route" value={ routeGet } onChange={ hcGene(routeSet) }>
            <option value="0">岡崎行き(環状線)</option>
            <option value="1">高蔵寺行き(環状線)</option>
            <option value="2">藤が丘行き(リニモ)</option>
        </select>
        <input type="time" name="time_search" id="time_search" value={ timeSearchGet } onChange={ hcGene(timeSearchSet) } required />
        <div id="weather">{ weatherGet }</div>
        <ul id="timetable_list">
            {

                <Datatable
                    route={ routeGet }
                    start={ timeSearchGet }
                    date={ now }
                    isHoliday={ isHoliday }
                />

            }
        </ul>
    </>);
}

function getDayName (date, isHoliday) {
    const day = date.getDay();
    const dayName = ['日', '月', '火', '水', '木', '金', '土'];
    return isHoliday ? '祝' : dayName[day];
}

export default App;
