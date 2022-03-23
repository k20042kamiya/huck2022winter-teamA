import React from 'react';
import './test.css'
import './Snap.css'
import Datatable from './Datatable';
import DepictTimes from './DepictTimes';
import { useState, useEffect } from 'react'
import getWether from './weather';
import JapaneseHoliday from 'japanese-holidays';

function App() {
    const getDayName = (date: Date, isHoliday: string | undefined) => isHoliday ? '祝' : ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
    const timeFormat = (time: Date) => `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    const hcGene = (func: Function) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => func(e.target.value);
    const changeTab = (element: React.MouseEvent<HTMLSpanElement, MouseEvent>) => selectedTabSet(element.currentTarget.dataset.index ?? '0');
    const setTimeNow = () => timeSearchSet(timeFormat(new Date()));

    const now = new Date();
    const timestamp = timeFormat(now);
    const isHoliday = JapaneseHoliday.isHoliday(now);
    const dateText = `${now.getMonth() + 1}月${now.getDate()}日（${getDayName(now, isHoliday)}）`;
    const tabs = ['余裕バス', '快適バス'];
    const localRoute = localStorage.getItem('route') ?? '0';
    const localTab = localStorage.getItem('selectedTab') ?? '0';

    const [routeGet, routeSet] = useState(localRoute);
    const [timeSearchGet, timeSearchSet] = useState(timestamp);
    const [weatherGet, weatherSet] = useState(<></>);
    const [selectedTabGet, selectedTabSet] = useState(localTab);

    localStorage.setItem('route', routeGet);
    localStorage.setItem('selectedTab', selectedTabGet);
    useEffect(() => {
        getWether().then(ret => weatherSet(ret));
    }, []);

    return (<>
        <header>帰るのに便利なやつ</header>
        <div id="flex_test-box">
            <div id="routebox">
                <p id="route-select">路線選択</p>
                <select name="route" id="route" value={routeGet} onChange={hcGene(routeSet)}>
                    <option value="0">岡崎行き(環状線)</option>
                    <option value="1">高蔵寺行き(環状線)</option>
                    <option value="2">藤が丘行き(リニモ)</option>
                </select>
            </div>
            <div id="timebox">
                <p id="time-select">時間選択</p>
                <button onClick={setTimeNow}>現在時刻</button>
                <input type="time" name="time_search" id="time_search" value={timeSearchGet} onChange={hcGene(timeSearchSet)} required/>
            </div>
        </div>
        <div id="timetablebox">
            {/* <div id="tab_wrapper">
                {
                    tabs.map((name, key) =>
                        <span className={`tab ${selectedTabGet === String(key) ? 'tab_front' : 'tab_back'}`} data-index={key} onClick={changeTab}>{name}</span>
                    )
                }
            </div> */}
            <div id="timetable_list" className="timetable_list">
                {
                    <DepictTimes
                        route={routeGet}
                        start={timeSearchGet}
                        date={now}
                        isHoliday={!!isHoliday}
                        selectedTab={selectedTabGet}
                    />
                }
            </div>
        </div>
        <div id="weatherbox">
            <div id="today">{dateText}</div>
            <div id="weather">{weatherGet}</div>
        </div>
    </>);
}

export default App;
