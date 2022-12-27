import React, {useEffect, useState} from 'react';
import Selector from "../selector/selector";

const PlusButton = () => {
    const [selectors, setSelectors] = useState<JSX.Element[]>([]);

    const addSelector = () => {
        setSelectors([...selectors, <Selector key={selectors.length} />]);
    };

    return (
        <div className="Selectors" >
            {selectors}
            <button  className="button-30" onClick={addSelector}>+</button>
        </div>
    );
}
export default PlusButton