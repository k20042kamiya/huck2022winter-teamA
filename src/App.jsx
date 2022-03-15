// import Nanka from './dokoka';
import './test.css'

function App() {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes()}`;

    return (<>
        <header><h1>時刻表</h1></header>
        <select name="route" id="route">
            <option value="0">岡崎行き(環状線)</option>
            <option value="1">高蔵寺行き(環状線)</option>
            <option value="2">藤が丘行き(リニモ)</option>
        </select>
        <ul id="timetable_list">
            {
                // new Array(3).map((_, k) =>
                //     <Nanka
                //         key={ k }
                //         route={ document.querySelector('#route').value }
                //         start={ document.querySelector('#time_search').value }
                //         date={ new Date() }
                //     />
                // )
            }
        </ul>
        <footer>
            <p class="time">時刻検索</p>
            <input type="time" name="time_search" id="time_search" class="timeinput" value={ timestamp } required />
            <button class="button">設定</button>
        </footer>
    </>);
}

export default App;
