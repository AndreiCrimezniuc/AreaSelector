import './selector.css'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';

interface Street {
    Name: string;
}

interface HouseNumber {
    Number: string;
}

const api_url = "http://65.109.133.226"
const Selector = () => {
    const [streets, setStreets] = useState<Street[]>([]);
    const [houseNumbers, setHouseNumbers] = useState<HouseNumber[]>([]);
    const [selectedStreet, setSelectedStreet] = useState<string | null>(null);
    const [selectedHouseNumbers, setSelectedHouseNumbers] = useState<string[]>([]);

    const fetchStreets = async () => {
        try {
            const response = await axios.get<Street[]>(api_url +'/streets');
            setStreets(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHouseNumbers = async (street: string) => {
        try {
            const response = await axios.get<HouseNumber[]>(api_url + `/numbers/${street}`);
            const  defaultAllNumbers: HouseNumber = {
                Number: "*"
            }
            response.data.push(defaultAllNumbers)

            setHouseNumbers(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStreets();
    }, []);

    const handleStreetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStreet = event.target.value;
        setSelectedStreet(selectedStreet);
        fetchHouseNumbers(selectedStreet);
    };

    const handleHouseNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        const selectedHouseNumbers = [...event.target.selectedOptions].map((option) => String(option.value));
        setSelectedHouseNumbers(selectedHouseNumbers);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        window.open(api_url + `/area?street=${selectedStreet}&houseNumbers=${selectedHouseNumbers}`, '_blank');
    };

    return (
        <div className='container'>
        <div className="Selector">
            <h3>Форма поиска номера телефона и ФИО по ПОЛНОМУ адресу! </h3>
            <form onSubmit={handleSubmit} target="_blank">
                <div className='_blank-form first'><label htmlFor="street-selector">Улица:</label>
                    <select id="selector-element"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleStreetChange}>
                        {streets.map((street) => (
                            <option key={street.Name} value={street.Name}>{street.Name}</option>
                        ))}
                    </select></div>

<div className='_blank-form second'> <label htmlFor="house-number-selector">Номера домов: (выдели несколько через CTRL)</label>
    <select id="selector-element"
            className="selector-element bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            multiple onChange={handleHouseNumberChange}>
        {houseNumbers.map((number) => (
            <option key={number.Number} value={number.Number}>{number.Number}</option>
        ))}
    </select></div>

                <button  className="button-30" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
}
export default Selector;