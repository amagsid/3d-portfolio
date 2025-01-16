'use client';
import { useRef, useEffect } from 'react';
import Main from './sections/Main';
import AboutMe from './Sections/AboutMe';
import Clients from './Sections/Clients';
import NavigationUI from './Sections/NavigationUI';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import useMousePosition from './hooks/useMousePosition';

export default function Home() {
    //scroll progress to track scroll to rotate earth shape
    //work on tracking the parent div of the cabvas instead of the most outer div
    const globeParentScrollRef = useRef(); // Ref for the scrollable div
    const { x, y } = useMousePosition();

    const cursorSize = 25; // Adjust this if your cursor size changes

    return (
        <div
            ref={globeParentScrollRef}
            className='
            
            overflow-y-scroll
            
            h-screen  snap-mandatory bg-zinc-950  text-white'
        >
            <motion.div
                animate={{ x: x - 12.5, y: y - 12.5 }}
                className='cursor'
                transition={
                    {
                        // type: 'spring',
                        // stiffness: 450,
                        // damping: 30,
                    }
                }
            ></motion.div>
            <NavigationUI />
            <div className=' snap-center align-center flex items-center justify-center sm  w-screen h-screen sm:h-[120vh]'>
                <Main />
            </div>
            <div className='snap-center align-center flex  w-screen h-screen '>
                <AboutMe
                    globeParentScrollRef={globeParentScrollRef}
                    x={x}
                    y={y}
                />
            </div>
            <div className='snap-center align-center w-screen h-screen '>
                <Clients globeParentScrollRef={globeParentScrollRef} />
            </div>
            <div className='snap-center align-center  w-screen h-screen '>
                4
            </div>
        </div>

        // <Footer />
    );
}
