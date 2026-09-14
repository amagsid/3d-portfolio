'use client';
import { useRef, useState } from 'react';
import Main from './Sections/Main';
import AboutMe from './Sections/AboutMe';
import Clients from './Sections/Clients';
import Contact from './Sections/Contact';
import NavigationUI from './Sections/NavigationUI';
import Cursor from './components/Cursor';

export default function Home() {
    const globeParentScrollRef = useRef();
    const [flashlight, setFlashlight] = useState(false);
    const [invert, setInvert] = useState(false);

    return (
        <div
            ref={globeParentScrollRef}
            className='
            
            overflow-y-scroll
            
            h-screen  snap-mandatory bg-zinc-950  text-white'
        >
            <Cursor flashlight={flashlight} invert={invert} />
            <NavigationUI scrollRef={globeParentScrollRef} invert={invert} />
            <div
                id='home'
                className=' snap-center align-center flex items-center justify-center sm  w-screen h-screen sm:h-[120vh]'
            >
                <Main />
            </div>
            <div id='about' className='snap-start w-screen'>
                <AboutMe
                    globeParentScrollRef={globeParentScrollRef}
                    onFlashlight={setFlashlight}
                />
            </div>
            <div id='work' className='snap-start w-screen'>
                <Clients
                    globeParentScrollRef={globeParentScrollRef}
                    onInvertCursor={setInvert}
                />
            </div>
            <div
                id='contact'
                className='snap-center align-center w-screen h-screen'
            >
                <Contact globeParentScrollRef={globeParentScrollRef} />
            </div>
        </div>
    );
}
