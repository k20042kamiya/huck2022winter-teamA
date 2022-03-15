// import Nanka from './dokoka';
// import './test.css'
import { useState } from 'react'

function App() {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, 0)}`;

    const [route, setRoute] = useState('0');
    const [timeSearch, setTimeSearch] = useState(timestamp);

    return (<>
        <header>時刻表</header>
        <select name="route" id="route" value={ route } onChange={ e => setRoute(e.target.value) }>
            <option value="0">岡崎行き(環状線)</option>
            <option value="1">高蔵寺行き(環状線)</option>
            <option value="2">藤が丘行き(リニモ)</option>
        </select>
        <ul id="timetable_list">
            {
                // new Array(1).map((_, k) =>
                //     <Nanka
                //         key={ k }
                //         route={ route }
                //         start={ timeSearch }
                //         date={ now }
                //     />
                // )
            }
        </ul>
        <footer>
            <input type="time" name="time_search" id="time_search" value={ timeSearch } onChange={ e => setTimeSearch(e.target.value) } required />
            <button>設定</button>
        </footer>
    </>);
}

export default App;
