import {useDeferredValue, useEffect, useState} from 'react';
import {ChangeName} from "./Comps/ChangeName.jsx";

function App() {
    const [name, setName] =  useState('')
    const deferredValue = useDeferredValue(name);
    useEffect(() => {
    }, [deferredValue]);
    return (
        <div>
            <ChangeName name={deferredValue} setName={setName}/>
        </div>
    );
}

export default App;
