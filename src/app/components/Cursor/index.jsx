'use client';
import { useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useSpring,
    useTransform,
} from 'framer-motion';

const REST_SIZE = 25;
const FLASH_SIZE = 150;

const Cursor = ({ flashlight, invert }) => {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const follow = { stiffness: 140, damping: 16, mass: 0.55 };
    const springX = useSpring(mx, follow);
    const springY = useSpring(my, follow);
    const size = useSpring(REST_SIZE, {
        stiffness: 280,
        damping: 16,
        mass: 0.6,
    });

    useEffect(() => {
        const onMove = (event) => {
            mx.set(event.clientX);
            my.set(event.clientY);
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [mx, my]);

    useEffect(() => {
        size.set(flashlight ? FLASH_SIZE : REST_SIZE);
    }, [flashlight, size]);

    useMotionValueEvent(size, 'change', (value) => {
        document.documentElement.style.setProperty(
            '--flashlight-r',
            `${value / 2}px`
        );
    });

    const left = useTransform([springX, size], ([x, s]) => x - s / 2);
    const top = useTransform([springY, size], ([y, s]) => y - s / 2);

    return (
        <motion.div
            className={`cursor${flashlight ? ' cursorFlashlight' : ''}${
                invert ? ' cursorInvert' : ''
            }`}
            style={{ x: left, y: top, width: size, height: size }}
            aria-hidden
        />
    );
};

export default Cursor;
