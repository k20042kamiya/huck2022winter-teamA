import Nanka from './dokoka';

function App() {
    return (<>
        <header>時刻表</header>
        <select name="route" id="route">
            <option value="0">岡崎行き(環状線)</option>
            <option value="1">高蔵寺行き(環状線)</option>
            <option value="2">藤が丘行き(リニモ)</option>
        </select>
        <ul id="timetable_list">
            {
                new Array(3).map((_, k) =>
                    <Nanka
                        key={ k }
                        route={ document.querySelector('#route').value }
                        start={ new Date() }
                    />
                )
            }
        </ul>
        <footer>
            <input type="time" name="time_search" id="time_search" />
            <button>設定</button>
        </footer>
    </>);
}

export default App;
