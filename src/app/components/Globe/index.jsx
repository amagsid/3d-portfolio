'use client';
import { Canvas } from '@react-three/fiber';

const Globe = () => {
    return (
        <div className='text-black'>
            this is globewee
            <Canvas>
                <mesh>
                    <sphereGeometry />
                </mesh>
            </Canvas>
        </div>
    );
};

export default Globe;
