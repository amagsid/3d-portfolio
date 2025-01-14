import React from 'react';

const NavigationUI = () => {
    return (
        <div className='navo grid grid-rows-2 grid-cols-2  border-2 border-pink-500 h-screen absolute pointer-events-none w-full z-20 px-4 py-4'>
            <div className='self-start justify-self-start'>logo</div>
            <div className='self-start justify-self-end'>nav</div>
            <div className='self-end justify-self-start'>social</div>
            <div className='self-end justify-self-end'>audio</div>
        </div>
    );
};

export default NavigationUI;
