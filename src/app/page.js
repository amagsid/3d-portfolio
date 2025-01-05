'use client';
import { useRef, useEffect } from 'react';
import Main from './sections/Main';
import AboutMe from './Sections/AboutMe';
import CoolTrick from './Sections/CoolTrick';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function Home() {
    //scroll progress to track scroll to rotate earth shape
    //work on tracking the parent div of the cabvas instead of the most outer div
    const scrollRef = useRef(); // Ref for the scrollable div

    const { scrollYProgress } = useScroll({
        container: scrollRef,
        offset: ['start end', 'end start'], // Adjust scroll thresholds
    });

    // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    //     console.log('Page scroll: ', latest);
    // });

    return (
        <div
            ref={scrollRef}
            className='overflow-y-scroll h-screen  snap-mandatory bg-zinc-950  text-white 
        
        '
        >
            <div className=' snap-center align-center flex items-center justify-center sm  w-screen h-screen sm:h-[120vh]'>
                <Main />
            </div>
            <div className='snap-center align-center  w-screen h-screen '>
                <AboutMe />
            </div>
            {/* <div className='snap-center align-center w-screen h-screen '> */}{' '}
            <CoolTrick scrollYProgress={scrollYProgress} />
            {/* </div> */}
            <div className='snap-center align-center  w-screen h-screen '>
                4
            </div>
        </div>

        // <Footer />
    );
}
