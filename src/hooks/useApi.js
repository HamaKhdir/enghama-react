import { useState, useEffect } from 'react';
import apiClient from '../lib/axios'; // apiClientـی نوێ import دەکەین

const useApi = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // فانکشنێک بۆ ڕێگری لە گۆڕینی state ئەگər کۆمپۆنێنتەکە لابرا
        let isMounted = true; 

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(endpoint);
                if (isMounted) {
                    setData(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    console.error(`Error fetching from ${endpoint}:`, err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (endpoint) {
            fetchData();
        } else {
            setLoading(false);
        }

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, [endpoint]); // هەر کاتێک endpoint گۆڕا، دووبارە داتا وەردەگرێت

    return { data, loading, error };
};

export default useApi;