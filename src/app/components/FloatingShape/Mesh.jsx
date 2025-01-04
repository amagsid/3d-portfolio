import { useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';

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
        [rotation.x - multiplier / 3, rotation.x + multiplier / 3]
    );
    const rotationY = useTransform(
        mouse.y,
        [0, 1],
        [rotation.y - multiplier / 3, rotation.y + multiplier / 3]
    );
    const positionX = useTransform(
        mouse.x,
        [0, 1],
        [position.x - multiplier * 5, position.x + multiplier * 5]
    );
    const positionY = useTransform(
        mouse.y,
        [0, 1],
        [position.y + multiplier * 5, position.y - multiplier * 5]
    );

    const materialVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
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
                // color='#791740'
                color='blue'
                // color='#672e3e'
                // color='#714171'
                // color='red'
                transparent
                variants={materialVariants} // Opacity animation on material
                initial='hidden'
                animate='visible'
            />
        </motion.mesh>
    );
}

export default Mesh;
