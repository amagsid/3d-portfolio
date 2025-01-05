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

const CoolTrick = ({ globeParentScrollRef }) => {
    const scrollRef = useRef(null); // Ref for CoolTrick component itself
    const { scrollYProgress } = useScroll({
        container: globeParentScrollRef, // Track scroll within parent container
        target: scrollRef, // Track the scroll progress of the CoolTrick component
        offset: ['start end', 'end start'], // When CoolTrick enters and exits the view
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        console.log('Scroll progress:', latest);
    });

    return (
        <div
            ref={scrollRef}
            className='section-container h-screen w-full flex flex-col relative  '
        >
            <Globe scrollYProgress={scrollYProgress} />
            <h1>Text Placeholder</h1>
        </div>
    );
};

export default CoolTrick;
