'use client';
import { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';

const Globe = ({ scrollYProgress }) => {
    //earth texture resources
    const [color, normal, occulusionMap] = useLoader(TextureLoader, [
        './media/globe/color.jpg',
        './media/globe/normal.png',
        './media/globe/occlusion.jpg',
    ]);

    return (
        <Canvas style={{ position: 'absolute' }}>
            <ambientLight intensity={0.1} />
            <directionalLight intensity={4} position={[1.8, 0.0, -0.1]} />

            <motion.mesh scale={2.5} rotation-y={scrollYProgress}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={color}
                    normalMap={normal}
                    aoMap={occulusionMap}
                />
            </motion.mesh>
        </Canvas>
        // </motion.div>
    );
};

export default Globe;
