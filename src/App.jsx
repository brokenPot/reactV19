import {useDeferredValue, useState} from 'react';
import {ChangeName} from "./Comps/ChangeName.jsx";
import SearchComponent from "./Comps/SearchComponent.jsx";

function App() {
    const [name, setName] =  useState('')
    const deferredValue = useDeferredValue(name);

    return (
        <div>
            <ChangeName name={deferredValue} setName={setName}/>
            <SearchComponent/>
        </div>
    );
}

export default App;
