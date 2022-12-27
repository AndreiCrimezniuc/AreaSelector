import React, { useState, useEffect } from 'react';

const SubmitButton = () => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    // get all forms with class "selector"
    const forms = document.querySelectorAll<HTMLFormElement>('.selector');

    useEffect(() => {
        forms.forEach((form) => {
            // get form data when it changes
            form.addEventListener('change', (event) => {
                const { name, value } = event.target as HTMLInputElement;
                setFormData({ ...formData, [name]: value });
            });
        });
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);
        // send data to /area
    };

    return (
        <div>
            {/* render forms with class "selector" */}
            {Array.from(forms).map((form, index) => (
                <form key={index} className="selector-form" onSubmit={handleSubmit}>
                    {form.innerHTML}
                    <button type="submit">Submit</button>
                </form>
            ))}
        </div>
    );
};
export default SubmitButton