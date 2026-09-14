'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

function Earth({ scrollYProgress }) {
    const meshRef = useRef(null);
    const [color, normal, occlusionMap] = useLoader(TextureLoader, [
        '/media/globe/color.jpg',
        '/media/globe/normal.png',
        '/media/globe/occlusion.jpg',
    ]);

    useFrame(() => {
        if (!meshRef.current || !scrollYProgress) return;
        meshRef.current.rotation.y = scrollYProgress.get() * Math.PI * 2;
    });

    return (
        <mesh ref={meshRef} scale={1.35} position={[1.55, -0.1, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                map={color}
                normalMap={normal}
                aoMap={occlusionMap}
            />
        </mesh>
    );
}

const Globe = ({ scrollYProgress }) => {
    return (
        <div className='pointer-events-none absolute inset-0 z-0'>
            <Canvas
                gl={{ alpha: true, antialias: true }}
                camera={{ position: [0, 0, 6.2], fov: 40 }}
            >
                <color attach='background' args={['#09090b']} />
                <ambientLight intensity={0.12} />
                <directionalLight intensity={3.4} position={[1.8, 0.2, 1]} />
                <Suspense fallback={null}>
                    <Earth scrollYProgress={scrollYProgress} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Globe;
