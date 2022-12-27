import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitButton = () => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    // get all forms with class "selector-form"
    const forms = document.querySelectorAll<HTMLFormElement>('.selector-form');

    useEffect(() => {
        forms.forEach((form) => {
            // get form data when it changes
            form.addEventListener('change', (event) => {
                const { name, value } = event.target as HTMLInputElement;
                setFormData({ ...formData, [name]: value });
            });
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await axios.post('/area', formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {/* render forms with class "selector-form" */}
            {Array.from(forms).map((form, index) => (
                <form key={index} className="selector-form">
                    {form.innerHTML}
                </form>
            ))}
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default SubmitButton