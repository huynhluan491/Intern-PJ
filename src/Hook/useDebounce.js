import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const idDelay = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(idDelay);
    }, [value]);
    return debouncedValue;
};

export default useDebounce;
