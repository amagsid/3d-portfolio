import Image from 'next/image';
import Main from './sections/Main';
import AboutMe from './Sections/AboutMe';
import CoolTrick from './Sections/CoolTrick';
import { Canvas } from '@react-three/fiber';

export default function Home() {
    return (
        // <div className='overflow-y-scroll h-screen snap-y snap-mandatory '>
        <div className='overflow-y-scroll h-screen  snap-mandatory '>
            <div className=' snap-center align-center flex items-center justify-center sm  w-screen h-screen sm:h-[120vh]'>
                <Main />
            </div>
            <div className='snap-center align-center  w-screen h-screen bg-green-100 text-black'>
                <AboutMe />
            </div>
            <div className='snap-center align-center w-screen h-screen bg-blue-100'>
                {' '}
                <CoolTrick />
            </div>
            <div className='snap-center align-center  w-screen h-screen bg-red-100'>
                4
            </div>
        </div>

        // <Footer />
    );
}
