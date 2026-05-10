import { useState, useEffect } from 'react';

export const useScreenSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const deriveSize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        deriveSize();
        window.addEventListener("resize", deriveSize);

        return () => {
            window.removeEventListener("resize", deriveSize);
        }
    }, []);

    return size;
};