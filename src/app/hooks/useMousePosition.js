import { useState, useEffect } from 'react';

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const updateMousePosition = (e) => {
        // setMousePosition({ x: e.clientX, y: e.clientY });
        setMousePosition({ x: e.pageX, y: e.pageY });
    };
    useEffect(() => {
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
}
