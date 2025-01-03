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
                color='#791740'
                transparent
                variants={materialVariants} // Opacity animation on material
                initial='hidden'
                animate='visible'
            />
        </motion.mesh>
    );
}

export default Mesh;
