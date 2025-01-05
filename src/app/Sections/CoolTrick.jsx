'use client';
import React from 'react';
import Globe from '../components/Globe';
// import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion-3d';
import { Canvas, useLoader } from '@react-three/fiber';
import {
    calcLength,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from 'framer-motion';
import { TextureLoader } from 'three';

const CoolTrick = ({ scrollYProgress }) => {
    const scroll = useRef(); // Ref for the scrollable div

    // const { scrollY } = useScroll({ container: scrollRef }); // Attach to custom container

    // const { scrollYProgress } = useScroll({
    //     container: scroll,
    //     offset: ['start end', 'end start'], // Adjust scroll thresholds
    // });

    // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    //     console.log('Scroll progress:', latest);
    // });

    return (
        <div
            ref={scroll}
            className='section-container h-screen w-full flex flex-col overflow-y-scroll  '
        >
            <Globe scrollYProgress={scrollYProgress} />{' '}
            {/* Add enough height for scrolling */}
            <h1>Text Placeholder</h1>
        </div>
    );
};

export default CoolTrick;
