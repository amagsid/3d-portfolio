import { useGLTF } from '@react-three/drei';
import { Float } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three'; // Import THREE.js
import { motion } from 'framer-motion-3d';
import Mesh from './Mesh';

const Model = ({ mouse }) => {
    const { nodes } = useGLTF('/media/floating_shapes4.glb');

    const variants = {
        hidden: {
            scale: 0.5,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Time between each child's animation
                duration: 2.2, // Animation duration for parent
            },
        },
    };

    const childVariants = {
        hidden: { scale: 0, opacity: 0, rotationX: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5 },
            ease: 'easeInOut',
        },
    };
    return (
        <Float>
            <motion.group
                // transparent
                initial='hidden' // Use the "hidden" state for the initial
                animate='visible' // Use the "visible" state for the animation
                variants={variants}
            >
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Sphere001}
                        multiplier={2.4}
                        mouse={mouse}
                        // isActive={activeShape == 1}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Sphere002}
                        multiplier={2.4}
                        mouse={mouse}

                        // isActive={activeShape == 2}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Cylinder002}
                        multiplier={1.2}
                        mouse={mouse}
                        // isActive={activeShape == 3}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Sphere003}
                        multiplier={1}
                        mouse={mouse}
                        // isActive={activeShape == 4}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Cylinder003}
                        multiplier={1.8}
                        mouse={mouse}
                        // isActive={activeShape == 5}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Cylinder005}
                        multiplier={1.8}
                        mouse={mouse}
                        // isActive={activeShape == 6}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Cube002}
                        multiplier={2}
                        mouse={mouse}
                        // isActive={activeShape == 7}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Cylinder006}
                        multiplier={1.2}
                        mouse={mouse}
                        // isActive={activeShape == 8}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Cylinder007}
                        multiplier={1.6}
                        mouse={mouse}
                        // isActive={activeShape == 9}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Cylinder009}
                        multiplier={1.8}
                        mouse={mouse}
                        // isActive={activeShape == 10}
                    />
                </motion.mesh>
                <motion.mesh variants={childVariants}>
                    <Mesh
                        node={nodes.Sphere}
                        multiplier={1.5}
                        mouse={mouse}
                        // isActive={activeShape == 11}
                    />
                </motion.mesh>
            </motion.group>
        </Float>
    );
};

// function Mesh({ node, mouse, multiplier }) {
//     const {
//         castShadow,
//         receiveShadow,
//         geometry,
//         material,
//         position,
//         rotation,
//         scale,
//     } = node;

//     const rotationX = useTransform(
//         mouse.x,
//         [0, 1],
//         [rotation.x - multiplier / 2, rotation.x + multiplier / 2]
//     );
//     const rotationY = useTransform(
//         mouse.y,
//         [0, 1],
//         [rotation.y - multiplier / 2, rotation.y + multiplier / 2]
//     );
//     const positionX = useTransform(
//         mouse.x,
//         [0, 1],
//         [position.x - multiplier * 4, position.x + multiplier * 4]
//     );
//     const positionY = useTransform(
//         mouse.y,
//         [0, 1],
//         [position.y + multiplier * 4, position.y - multiplier * 4]
//     );

//     const materialVariants = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { duration: 0.5 } },
//     };

//     return (
//         <motion.mesh
//             castShadow={castShadow}
//             receiveShadow={receiveShadow}
//             geometry={geometry}
//             material={material}
//             position={position}
//             rotation={rotation}
//             rotation-x={rotationY}
//             rotation-y={rotationX}
//             position-x={positionX}
//             position-y={positionY}
//             scale={scale}
//         >
//             <motion.meshStandardMaterial
//                 color='#791740'
//                 transparent
//                 variants={materialVariants} // Opacity animation on material
//                 initial='hidden'
//                 animate='visible'
//             />
//         </motion.mesh>
//     );
// }

useGLTF.preload('/media/floating_shapes4.glb');

export default Model;
