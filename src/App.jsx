import Datatable from './Datatable';
function App() {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes()}`;

    return (<>
        <header>時刻表</header>
        <select name="route" id="route">
            <option value="0">岡崎行き(環状線)</option>
            <option value="1">高蔵寺行き(環状線)</option>
            <option value="2">藤が丘行き(リニモ)</option>
        </select>
        <ul id="timetable_list">
            {
                new Array(1).map((_, k) =>
                    <Datatable
                        key={ k }
                        route={ document.querySelector('#route').value }
                        start={ document.querySelector('#time_search').value }
                        date={ new Date() }
                    />
                )
            }
        </ul>
        <footer>
            <input type="time" name="time_search" id="time_search" value={ timestamp } required />
            <button>設定</button>
        </footer>
    </>);
}

export default App;
