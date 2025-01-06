'use client';
import Globe from '../components/Globe';
import { useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent, useSpring } from 'framer-motion';

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

    const smoothedScroll = useSpring(scrollYProgress, { damping: 20 });

    return (
        <div
            ref={scrollRef}
            className='section-container h-screen w-full flex flex-col relative  '
        >
            <Globe scrollYProgress={smoothedScroll} />
            <h1>Text Placeholder</h1>
        </div>
    );
};

export default CoolTrick;
