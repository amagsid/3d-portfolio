'use client';
import FloatingShape from '../components/FloatingShape';
import Button from '../components/Button';
import { useIsMobile } from '../hooks/useIsMobile'; // Adjust the path as needed

const Main = () => {
    const isMobile = useIsMobile();
    return (
        <main className='flex  h-screen w-screen  gap-8 row-start-2 items-center sm:items-start relative'>
            <FloatingShape />
            <div className=' text-zinc-700 absolute w-screen flex flex-col justify-center items-center h-screen'>
                <div className=' font-bold text-8xl text-center leading-[80%] mix-blend-color-dodge'>
                    <h5 className='text-sm font-medium tracking-wide'>
                        AHMAD SAEED
                    </h5>
                    <h1>
                        {' '}
                        MAKING <br /> GOOD <br /> SHIT <br /> SINCE <br /> 2009
                    </h1>
                </div>

                <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
                {/* <Button /> */}
            </div>
        </main>
    );
};

export default Main;
