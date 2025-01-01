'use client';
import FloatingShape from '../components/FloatingShape';
import Button from '../components/Button';
import { useIsMobile } from '../hooks/useIsMobile'; // Adjust the path as needed

const Main = () => {
    const isMobile = useIsMobile();
    return (
        <main className='flex  h-screen w-screen bg-rose-300  gap-8 row-start-2 items-center sm:items-start relative'>
            <FloatingShape />
            <div className=' text-zinc-700 absolute w-screen flex flex-col justify-center items-center h-screen'>
                {' '}
                <h1 className=' font-bold text-5xl'>
                    Error 404: page probably not found
                </h1>
                <h4 className=' text-2xl'>
                    Do NOT scroll down, but if you must
                </h4>
                <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
                {/* <Button /> */}
            </div>
        </main>
    );
};

export default Main;
