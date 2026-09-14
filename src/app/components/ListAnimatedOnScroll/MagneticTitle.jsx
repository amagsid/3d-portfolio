'use client';
import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const follow = { stiffness: 420, damping: 28, mass: 0.35 };
const SETTLE_MS = 90;
const MAX_NUDGE = 6;

function MagneticLetter({ char, amount = MAX_NUDGE }) {
    const x = useSpring(0, follow);
    const y = useSpring(0, follow);
    const last = useRef({ x: 0, y: 0 });
    const settle = useRef(null);

    const rest = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            style={{ x, y, display: 'inline-block' }}
            onMouseEnter={(event) => {
                last.current = { x: event.clientX, y: event.clientY };
            }}
            onMouseMove={(event) => {
                const dx = event.clientX - last.current.x;
                const dy = event.clientY - last.current.y;
                last.current = { x: event.clientX, y: event.clientY };
                const dist = Math.hypot(dx, dy);
                if (dist < 0.4) return;
                const strength = Math.min(amount, dist * 5.85);
                x.set((dx / dist) * strength);
                y.set((dy / dist) * strength);
                clearTimeout(settle.current);
                settle.current = setTimeout(rest, SETTLE_MS);
            }}
            onMouseLeave={() => {
                clearTimeout(settle.current);
                rest();
            }}
        >
            {char}
        </motion.span>
    );
}

const MagneticTitle = ({ text, amount = MAX_NUDGE }) => (
    <>
        {String(text)
            .split('')
            .map((char, index) =>
                char === ' ' ? (
                    <span key={`${char}-${index}`}>&nbsp;</span>
                ) : (
                    <MagneticLetter
                        key={`${char}-${index}`}
                        char={char}
                        amount={amount}
                    />
                )
            )}
    </>
);

export default MagneticTitle;
