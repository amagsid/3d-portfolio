import Image from 'next/image';
import Main from './sections/Main';

export default function Home() {
    return (
        <div className='overflow-y-scroll max-h-screen snap-y snap-mandatory '>
            <div className='snap-center align-center flex items-center justify-center  w-screen h-screen'>
                <Main />
            </div>
            <div className='snap-center align-center  w-screen h-screen bg-green-100'>
                2
            </div>
            <div className='snap-center align-center w-screen h-screen bg-blue-100'>
                3
            </div>
            <div className='snap-center align-center  w-screen h-screen bg-red-100'>
                4
            </div>
        </div>

        // <Footer />
    );
}
