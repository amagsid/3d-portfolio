'use client';
import { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Globe = () => {
    const globeCanvas = useRef();
    const [color, normal, occulusionMap] = useLoader(TextureLoader, [
        './media/globe/color.jpg',
        './media/globe/normal.png',
        './media/globe/occlusion.jpg',
    ]);
    return (
        <Canvas ref={globeCanvas}>
            <directionalLight intensity={4} position={[1.8, 0.0, -0.1]} />
            <ambientLight intensity={0.1} />
            <mesh scale={2.5}>
                {/* <directionaLight intensity={1} /> */}
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={color}
                    normalMap={normal}
                    aoMap={occulusionMap}
                />
            </mesh>
        </Canvas>
    );
};

export default Globe;
