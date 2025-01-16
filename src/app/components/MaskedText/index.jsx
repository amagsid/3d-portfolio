'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';

const MasdkedText = ({ children, x, y }) => {
    return (
        <div className={styles.maskedWrapper}>
            <motion.p
                className={styles.mask}
                // animate={{
                //     WebkitMaskPosition: `${
                //         inComponentMousePosition.x - 120
                //     }px ${inComponentMousePosition.y - 140}px`,
                // }}
            >
                {' '}
                {children}{' '}
            </motion.p>
        </div>
    );
};

export default MasdkedText;
