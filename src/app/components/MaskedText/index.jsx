'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';

const maskSize = 150; // Adjust this if your cursor size changes

const MasdkedText = ({ children, x, y }) => {
    const [relativeMousePosition, setRelativeMousePosition] = useState({
        x: 0,
        y: 0,
    });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const container = containerRef.current;

        if (container) {
            const rect = container.getBoundingClientRect();
            console.log(rect);
            setRelativeMousePosition({
                x: x - rect.left - 180,
                y: y - rect.top - 120,
            });
            const offsetX = e.clientX - rect.left; // Cursor X position relative to the container
            const offsetY = e.clientY - rect.top; // Cursor Y position relative to the container

            console.log(relativeMousePosition);

            // Dynamically update mask position
            // container.style.setProperty('--mask-x', `${offsetX}px`);
            // container.style.setProperty('--mask-y', `${offsetY}px`);
        }
    };

    // useEffect(()=>{
    //     containerRef.onMouseMove.

    // },[])
    return (
        <div
            onMouseMove={handleMouseMove}
            ref={containerRef}
            className={styles.maskedWrapper}
        >
            <motion.p
                className={styles.mask}
                animate={{
                    WebkitMaskPosition: `${relativeMousePosition.x}px ${relativeMousePosition.y}px`,
                    maskPosition: `${relativeMousePosition.x}px ${relativeMousePosition.y}px`,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {' '}
                {children}{' '}
            </motion.p>
        </div>
    );
};

export default MasdkedText;
