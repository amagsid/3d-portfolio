'use client';
import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import Model from './Model';
import { useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

const HERO_MOUSE = { stiffness: 70, damping: 55, mass: 4 };
const CONTACT_MOUSE = { stiffness: 55, damping: 24, mass: 1.6 };

function CameraController({ isMobile, variant }) {
    const { camera } = useThree();

    useEffect(() => {
        const contact = variant === 'contact';
        if (isMobile) {
            camera.position.set(0, 0, 200);
            camera.zoom = contact ? 4.6 : 3;
        } else {
            camera.position.set(0, 0, 200);
            camera.zoom = contact ? 6.2 : 7;
        }
        camera.updateProjectionMatrix();
    }, [isMobile, camera, variant]);

    return null;
}

function StudioLights() {
    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight
                position={[40, 50, 90]}
                intensity={1.35}
                color='#f4f7ff'
            />
            <directionalLight
                position={[-70, 20, 40]}
                intensity={0.32}
                color='#7ea6ff'
            />
            <directionalLight
                position={[8, 4, 48]}
                intensity={2.05}
                color='#ec4e39'
            />
            <spotLight
                position={[12, 80, 70]}
                angle={0.42}
                penumbra={1}
                intensity={1.05}
                color='#ffffff'
            />
            <pointLight
                position={[2, 8, 32]}
                intensity={6.2}
                color='#ec4e39'
                distance={150}
            />
            <pointLight
                position={[2, -14, 28]}
                intensity={5.4}
                color='#ec4e39'
                distance={130}
            />
            <pointLight
                position={[-10, 6, 20]}
                intensity={3.2}
                color='#ff6240'
                distance={100}
            />
            <pointLight
                position={[18, 22, 150]}
                intensity={0.9}
                color='#dce6ff'
                distance={320}
            />
            <pointLight
                position={[-40, -10, 80]}
                intensity={0.65}
                color='#6d8dff'
                distance={220}
            />
            <Environment
                preset='city'
                background={false}
                environmentIntensity={0.82}
            />
        </>
    );
}

const FloatingShape = ({
    variant = 'hero',
    excited = false,
    inView = false,
    attract = null,
}) => {
    const isMobile = useIsMobile();
    const isContact = variant === 'contact';
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const mouseSpring = isContact ? CONTACT_MOUSE : HERO_MOUSE;
    const smoothMouse = {
        x: useSpring(mouseX, mouseSpring),
        y: useSpring(mouseY, mouseSpring),
    };
    const intensity = useSpring(isContact ? 0 : 1, {
        stiffness: 90,
        damping: 18,
        mass: 0.6,
    });
    const lean = useSpring(0, { stiffness: 64, damping: 16, mass: 0.7 });

    useEffect(() => {
        if (isContact) {
            intensity.set(inView ? (excited ? 0.14 : 0.48) : 0);
            lean.set(inView && excited ? 1 : 0);
            return;
        }
        intensity.set(1);
        lean.set(0);
    }, [excited, intensity, isContact, inView, lean]);

    useEffect(() => {
        const manageMouseMove = (e) => {
            if (attract) return;
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };

        window.addEventListener('mousemove', manageMouseMove);
        return () => window.removeEventListener('mousemove', manageMouseMove);
    }, [attract, mouseX, mouseY]);

    useEffect(() => {
        if (!attract) return;
        mouseX.set(Math.min(1, Math.max(0, 0.5 + attract.x * 0.5)));
        mouseY.set(Math.min(1, Math.max(0, 0.5 + attract.y * 0.5)));
    }, [attract, mouseX, mouseY]);

    return (
        <Canvas
            orthographic
            dpr={[1, 2]}
            gl={{
                alpha: true,
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.12,
            }}
            className='absolute inset-0 h-full w-full'
            style={{ pointerEvents: 'none' }}
        >
            <color attach='background' args={['#09090b']} />
            <CameraController isMobile={isMobile} variant={variant} />
            <Suspense fallback={null}>
                <Model
                    mouse={smoothMouse}
                    variant={variant}
                    intensity={intensity}
                    excited={excited}
                    inView={inView}
                    lean={lean}
                    attract={attract}
                />
                <StudioLights />
            </Suspense>
        </Canvas>
    );
};

export default FloatingShape;
