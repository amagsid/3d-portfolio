import { useGLTF } from '@react-three/drei';
import { Float } from '@react-three/drei';
import { useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER } from 'next/dist/lib/constants';

const Model = ({ mouse }) => {
    const { nodes } = useGLTF('/media/floating_shapes4.glb');
    return (
        <Float>
            <group>
                <motion.Mesh
                    node={nodes.Sphere001}
                    multiplier={2.4}
                    mouse={mouse}
                    // isActive={activeShape == 1}
                />
                <Mesh
                    node={nodes.Sphere002}
                    multiplier={2.4}
                    mouse={mouse}
                    // isActive={activeShape == 2}
                />
                <Mesh
                    node={nodes.Cylinder002}
                    multiplier={1.2}
                    mouse={mouse}
                    // isActive={activeShape == 3}
                />
                <Mesh
                    node={nodes.Sphere003}
                    multiplier={1}
                    mouse={mouse}
                    // isActive={activeShape == 4}
                />
                <Mesh
                    node={nodes.Cylinder003}
                    multiplier={1.8}
                    mouse={mouse}
                    // isActive={activeShape == 5}
                />
                <Mesh
                    node={nodes.Cylinder005}
                    multiplier={1.8}
                    mouse={mouse}
                    // isActive={activeShape == 6}
                />
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
            </group>
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
        [position.x - multiplier * 2, position.x + multiplier]
    );
    const positionY = useTransform(
        mouse.y,
        [0, 1],
        [position.y + multiplier * 2, position.y - multiplier]
    );

    return (
        <motion.mesh
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            geometry={geometry}
            material={material}
            position={position}
            rotation={rotation}
            scale={scale}
            rotation-x={rotationY}
            rotation-y={rotationX}
            position-x={positionX}
            position-y={positionY}
        />
    );
}

useGLTF.preload('/media/floating_shapes4.glb');

export default Model;
