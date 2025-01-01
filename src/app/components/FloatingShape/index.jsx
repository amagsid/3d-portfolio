'use client';
import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from './Model';
import { useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile'; // Adjust the path as needed

const FloatingShape = () => {
    const isMobile = useIsMobile();
    const mouse = { x: useMotionValue(0), y: useMotionValue(0) };

    // edit here to control background 3D shapes movement stiffnes - ease of animation
    const smoothMouse = {
        x: useSpring(mouse.x, { stifness: 70, damping: 55, mass: 4 }),
        y: useSpring(mouse.y, { stifness: 70, damping: 55, mass: 4 }),
    };

    //mouse movement handler
    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = clientX / innerWidth;
        const y = clientY / innerHeight;
        mouse.x.set(x);
        mouse.y.set(y);
    };

    useEffect(() => {
        //event listener for mouse move and shapes movement
        window.addEventListener('mousemove', manageMouseMove);

        //mouse movement listener cleanup
        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
        };
    }, []);

    //camera controller to set position and zoom level for mobile and desktop differently
    function CameraController({ isMobile }) {
        const { camera } = useThree();

        useEffect(() => {
            if (isMobile) {
                camera.position.set(0, 0, 500); // Mobile camera settings
                camera.zoom = 3;
            } else {
                camera.position.set(0, 0, 200); // Desktop camera settings
                camera.zoom = 8;
            }
            camera.updateProjectionMatrix(); // Notify Three.js of the changes
        }, [isMobile, camera]);

        return null; // This component doesn't render anything
    }

    return (
        <Canvas className=' bg-gray-300' orthographic>
            <CameraController isMobile={isMobile} />
            <Model mouse={smoothMouse} />

            <Environment preset='studio' />
            {/* <Environment preset='apartment' /> */}

            {/* <Environment preset='dawn' /> */}
            {/* 
            <Environment preset='warehouse' /> */}
        </Canvas>
    );
};

export default FloatingShape;
