import axios from 'axios';
import React, {useState} from 'react';
import Selector from "../selector/selector";

const SubmitButton = () => {
    const [selectors, setSelectors] = useState<{ street: string | null, houseNumbers: string[] }[]>([]);

    const handleSubmit = async () => {
        try {
            const data = selectors.map(({street, houseNumbers}) => ({street, houseNumbers}));
            await axios.post('http://localhost:8080/area', data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
        </div>
    );
};