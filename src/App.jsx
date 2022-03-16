import './test.css'
import Datatable from './Datatable';
import { useState, useEffect } from 'react'
import getWether from './weather';
import JapaneseHoliday from 'japanese-holidays';

function App() {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, 0)}`;
    const isHoliday = JapaneseHoliday.isHoliday(now);
    const dateText = `${now.getMonth() + 1}月${now.getDate()}日（${getDayName(now, isHoliday)}）`;
    const tabs = ['余裕バス', '快適バス'];

    const hcGene = func => (e => func(e.target.value));
    const changeTab = element => selectedTabSet(Number(element.target.dataset.index));
    const [routeGet, routeSet] = useState('0');
    const [timeSearchGet, timeSearchSet] = useState(timestamp);
    const [weatherGet, weatherSet] = useState(<></>);
    const [selectedTabGet, selectedTabSet] = useState(0);

    useEffect(() => getWether().then(ret => weatherSet(ret)), []);

    return (<>
        <header>時刻表</header>

        <div className="routebox">
            <p className="route-select">路線選択</p>
            <select name="route" id="route" className="route" value={routeGet} onChange={hcGene(routeSet)}>
                <option value="0">岡崎行き(環状線)</option>
                <option value="1">高蔵寺行き(環状線)</option>
                <option value="2">藤が丘行き(リニモ)</option>
            </select>
        </div>

        <div className="timebox">
            <p className="time-select">時間選択</p>
            <input type="time" name="time_search" id="time_search" className="time_search" value={timeSearchGet} onChange={hcGene(timeSearchSet)} required/>
        </div>

        <div className="weatherbox">
            <div className="tab_wrapper">
                {
                    tabs.map((name, key) =>
                        <span className={`box-title ${selectedTabGet === key ? 'tab_front' : 'tab_back'}`} data-index={key} onClick={changeTab}>{name}</span>
                    )
                }
            </div>
            <ul id="timetable_list" className="timetable_list">
                {
                    <Datatable
                        route={routeGet}
                        start={timeSearchGet}
                        date={now}
                        isHoliday={isHoliday}
                        selectedTab={selectedTabGet}
                    />
                }
            </ul>
        </div>

        <div className="box1">
            <div id="today" className="today">{dateText}</div>
            <div id="weather" className="weather">{weatherGet}</div>
        </div>
    </>);
}

function getDayName(date, isHoliday) {
    const day = date.getDay();
    const dayName = ['日', '月', '火', '水', '木', '金', '土'];
    return isHoliday ? '祝' : dayName[day];
}

export default App;
