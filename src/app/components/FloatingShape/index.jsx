'use client';
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from './Model';
import { useMotionValue } from 'framer-motion';

const FloatingShape = () => {
    const mouse = { x: useMotionValue(0), y: useMotionValue(0) };

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = clientX / innerWidth;
        const y = clientY / innerHeight;
        mouse.x.set(x);
        mouse.y.set(y);
    };
    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, []);
    return (
        <Canvas
            className=' bg-gray-300'
            orthographic
            camera={{ position: [0, 0, 200], zoom: 10 }}
        >
            <Model mouse={mouse} />

            <Environment preset='studio' />
            {/* <Environment preset='apartment' /> */}

            {/* <Environment preset='dawn' /> */}
            {/* 
            <Environment preset='warehouse' /> */}
        </Canvas>
    );
};

export default FloatingShape;
