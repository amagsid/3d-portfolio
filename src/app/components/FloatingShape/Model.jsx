import {
    MeshReflectorMaterial,
    MeshTransmissionMaterial,
    useGLTF,
} from '@react-three/drei';
import { Float } from '@react-three/drei';
import { color, useTransform } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three'; // Import THREE.js
import { MotionConfig, motion, MotionCanvas } from 'framer-motion-3d';

const Model = ({ mouse }) => {
    const { nodes } = useGLTF('/media/floating_shapes4.glb');
    return (
        <Float>
            <motion.group
                transparent
                initial='hidden' // Use the "hidden" state for the initial
                animate='visible' // Use the "visible" state for the animation
                // variants={{
                //     hidden: {
                //         scale: 0,
                //     },
                //     visible: {
                //         scale: 1,
                //         transition: {
                //             staggerChildren: 0.4, // Time between each child's animation
                //             duration: 0.75, // Animation duration for parent
                //         },
                //     },
                // }}
            >
                <motion.mesh
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Mesh
                        node={nodes.Sphere001}
                        multiplier={2.4}
                        mouse={mouse}
                        // isActive={activeShape == 1}
                    />
                </motion.mesh>
                <motion.mesh
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Mesh
                        node={nodes.Sphere002}
                        multiplier={2.4}
                        mouse={mouse}
                        // isActive={activeShape == 2}
                    />
                </motion.mesh>
                <motion.mesh
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 1.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Mesh
                        node={nodes.Cylinder002}
                        multiplier={1.2}
                        mouse={mouse}
                        // isActive={activeShape == 3}
                    />
                </motion.mesh>
                <motion.mesh
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Mesh
                        node={nodes.Sphere003}
                        multiplier={1}
                        mouse={mouse}
                        // isActive={activeShape == 4}
                    />
                </motion.mesh>
                <motion.mesh
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Mesh
                        node={nodes.Cylinder003}
                        multiplier={1.8}
                        mouse={mouse}
                        // isActive={activeShape == 5}
                    />
                </motion.mesh>
                <motion.mesh
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <Mesh
                        node={nodes.Cylinder005}
                        multiplier={1.8}
                        mouse={mouse}
                        // isActive={activeShape == 6}
                    />
                </motion.mesh>
                <Mesh
                    node={nodes.Cube002}
                    multiplier={2}
                    mouse={mouse}
                    // isActive={activeShape == 7}
                />
                <Mesh
                    node={nodes.Cylinder006}
                    multiplier={1.2}
                    mouse={mouse}
                    // isActive={activeShape == 8}
                />
                <Mesh
                    node={nodes.Cylinder007}
                    multiplier={1.6}
                    mouse={mouse}
                    // isActive={activeShape == 9}
                />
                <Mesh
                    node={nodes.Cylinder009}
                    multiplier={1.8}
                    mouse={mouse}
                    // isActive={activeShape == 10}
                />
                <Mesh
                    node={nodes.Sphere}
                    multiplier={1.5}
                    mouse={mouse}
                    // isActive={activeShape == 11}
                />
            </motion.group>
        </Float>
    );
};

function Mesh({ node, mouse, multiplier }) {
    const {
        castShadow,
        receiveShadow,
        geometry,
        material,
        position,
        rotation,
        scale,
    } = node;

    const rotationX = useTransform(
        mouse.x,
        [0, 1],
        [rotation.x - multiplier / 2, rotation.x + multiplier / 2]
    );
    const rotationY = useTransform(
        mouse.y,
        [0, 1],
        [rotation.y - multiplier / 2, rotation.y + multiplier / 2]
    );
    const positionX = useTransform(
        mouse.x,
        [0, 1],
        [position.x - multiplier * 4, position.x + multiplier * 4]
    );
    const positionY = useTransform(
        mouse.y,
        [0, 1],
        [position.y + multiplier * 4, position.y - multiplier * 4]
    );

    const opacityVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        transition: {
            duration: 2, // Adjust duration as needed
            // ease: [0.22, 1, 0.36, 1], // Smooth bounce easing
        },
    };

    return (
        <motion.mesh
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            geometry={geometry}
            material={material}
            position={position}
            rotation={rotation}
            rotation-x={rotationY}
            rotation-y={rotationX}
            position-x={positionX}
            position-y={positionY}
            scale={scale}
        >
            <motion.meshStandardMaterial
                color='blue'
                transparent
                initial='hidden'
                animate='visible'
                variants={opacityVariants}
            />
        </motion.mesh>
    );
}

useGLTF.preload('/media/floating_shapes4.glb');

export default Model;
