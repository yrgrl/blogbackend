
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExampleComponent = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data'); // Your API endpoint
                setData(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Data from Backend</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExampleComponent;