// import Datatable from './Datatable';
import { useState, useEffect } from 'react'
import getWether from './weather';

function App() {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, 0)}`;

    const hcGene = func => (e => func(e.target.value));
    const [routeGet, routeSet] = useState('0');
    const [timeSearchGet, timeSearchSet] = useState(timestamp);
    const [weatherGet, weatherSet] = useState(<></>);

    useEffect(() => {
        getWether().then(ret => {
            weatherSet(ret);
        });
    },[])

    return (<>
        <header>時刻表</header>
        <select name="route" id="route" value={ routeGet } onChange={ hcGene(routeSet) }>
            <option value="0">岡崎行き(環状線)</option>
            <option value="1">高蔵寺行き(環状線)</option>
            <option value="2">藤が丘行き(リニモ)</option>
        </select>
        <div id="weather">{ weatherGet }</div>
        <ul id="timetable_list">
            {
                // new Array(1).map((_, k) =>
                //     <Datatable
                //         key={ k }
                //         route={ routeGet }
                //         start={ timeSearchGet }
                //         date={ now }
                //     />
                // )
            }
        </ul>
        <footer>
            <input type="time" name="time_search" id="time_search" value={ timeSearchGet } onChange={ hcGene(timeSearchSet) } required />
            <button>設定</button>
        </footer>
    </>);
}

export default App;
