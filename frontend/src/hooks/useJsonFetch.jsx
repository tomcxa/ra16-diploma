import { useState, useEffect } from 'react';

export default function useJsonFetch(url, opts) {
    const [data, setData] = useState([]);
    // const [responseLength, setResponseLength] = useState(0)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log(url)
            setLoading(true);
            try {
                const response = await fetch(url, opts);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                // setResponseLength(data.length)
                setData(data);
                setError(null);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, opts]);
    
    return [data, loading, error];
}