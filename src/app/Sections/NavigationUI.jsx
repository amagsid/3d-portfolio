'use client';
import CornerNav from '../components/CornerNav';

const NavigationUI = ({ scrollRef, invert = false }) => {
    return (
        <div className='navo h-screen fixed pointer-events-none w-full z-[1000]'>
            <CornerNav scrollRef={scrollRef} invert={invert} />
        </div>
    );
};

export default NavigationUI;
