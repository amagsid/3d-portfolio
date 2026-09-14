'use client';
import dynamic from 'next/dynamic';
import HeroDotMesh from '../components/HeroDotMesh';

const FloatingShape = dynamic(() => import('../components/FloatingShape'), {
    ssr: false,
});

const Main = () => {
    return (
        <main className='flex gap-8 row-start-2 items-center sm:items-start relative sm:h-[120vh] h-screen w-screen '>
            <HeroDotMesh />
            <FloatingShape />
            <div className='absolute z-[2] w-screen flex flex-col justify-center items-center h-screen'>
                <div
                    className=' text-[#b7ab98] font-bold text-8xl text-center leading-[80%]
            
                '
                >
                    <h5 className='text-sm font-medium tracking-[4px] text-pink-200'>
                        AHMAD SAEED
                    </h5>
                    <h1
                        className='         mix-blend-plus-lighter
                    r'
                    >
                        FRONTEND <br />
                        <span style={{ color: '#ec4e39' }}>INTERFACES</span>,
                        <br />
                        CRAFTED WITH <br />
                        <span style={{ color: '#ec4e39' }}>PURPOSE</span>
                    </h1>
                </div>

                {/* <div>{isMobile ?
                 'Mobile' : 'Desktop'}

                </div> */}
                {/* <Button /> */}
            </div>
        </main>
    );
};

export default Main;
