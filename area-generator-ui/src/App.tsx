import React from 'react';
import './App.css';
import Selector from "./component/selector/selector";
import PlusButton from "./component/plusButton/plusButton";
import SubmitButton from "./component/submitButton/submitButton";

function App() {
    return (
        <div>
            <SubmitButton/>
            <PlusButton/>
        </div>
    );
}

export default App;
