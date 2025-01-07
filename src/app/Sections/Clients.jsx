'use client';
// import Globe from '../components/Globe';
import { useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import ListAnimatedOnScroll from '../components/ListAnimatedOnScroll';

const Globe = dynamic(() => import('../components/Globe'), {
    ssr: false,
    loading: () => <img src='/assets/placeholder.png'></img>,
});

const CoolTrick = ({ globeParentScrollRef }) => {
    const scrollRef = useRef(null); // Ref for CoolTrick component itself

    const { scrollYProgress } = useScroll({
        container: globeParentScrollRef, // Track scroll within parent container
        target: scrollRef, // Track the scroll progress of the CoolTrick component
        offset: ['start end', 'end start'], // When CoolTrick enters and exits the view
    });

    // Scroll progress for the second child
    const { scrollYProgress: scrollYProgress2 } = useScroll({
        container: globeParentScrollRef, // Track scroll within parent container
        target: scrollRef, // Track the scroll progress of the CoolTrick component
        offset: ['start end', 'end start'],
    });

    useMotionValueEvent(scrollYProgress2, 'change', (latest) => {
        console.log('Scroll progressssssssssss:', latest);
    });

    const smoothedScroll = useSpring(scrollYProgress, { damping: 20 });

    return (
        <div
            ref={scrollRef}
            className='section-container h-screen w-full flex flex-col relative'
        >
            <Globe scrollYProgress={smoothedScroll} />
            <ListAnimatedOnScroll
                scrollYProgress={smoothedScroll}
                // globeParentScrollRef={globeParentScrollRef}
                // scrollRef={scrollRef}
            />
        </div>
    );
};

export default CoolTrick;
