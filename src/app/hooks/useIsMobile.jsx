import { useState, useEffect } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust breakpoint as needed
        const updateState = () => setIsMobile(mediaQuery.matches);

        updateState(); // Set the initial state
        mediaQuery.addEventListener('change', updateState); // Listen for viewport changes

        return () => mediaQuery.removeEventListener('change', updateState); // Cleanup listener
    }, [isMobile]);

    return isMobile;
}
