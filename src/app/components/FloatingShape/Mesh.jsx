import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTransform } from 'framer-motion';

function Mesh({
    mouse,
    multiplier,
    intensity,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    invertX = 1,
    invertY = 1,
    drift = 1,
    children,
}) {
    const groupRef = useRef(null);
    const rest = useMemo(
        () => ({
            position: [...position],
            rotation: [...rotation],
        }),
        [position, rotation]
    );

    const travel = multiplier * 5 * drift;
    const tilt = multiplier / 3;

    const rotationX = useTransform(
        mouse.x,
        [0, 1],
        [
            rest.rotation[0] - invertX * tilt,
            rest.rotation[0] + invertX * tilt,
        ]
    );
    const rotationY = useTransform(
        mouse.y,
        [0, 1],
        [
            rest.rotation[1] - invertY * tilt,
            rest.rotation[1] + invertY * tilt,
        ]
    );
    const positionX = useTransform(
        mouse.x,
        [0, 1],
        [rest.position[0] - invertX * travel, rest.position[0] + invertX * travel]
    );
    const positionY = useTransform(
        mouse.y,
        [0, 1],
        [rest.position[1] + invertY * travel, rest.position[1] - invertY * travel]
    );

    useFrame(() => {
        const group = groupRef.current;
        if (!group) return;

        const boost = intensity ? intensity.get() : 1;
        group.position.set(
            rest.position[0] + (positionX.get() - rest.position[0]) * boost,
            rest.position[1] + (positionY.get() - rest.position[1]) * boost,
            rest.position[2]
        );
        group.rotation.set(
            rest.rotation[1] + (rotationY.get() - rest.rotation[1]) * boost,
            rest.rotation[0] + (rotationX.get() - rest.rotation[0]) * boost,
            rest.rotation[2]
        );
    });

    return (
        <group
            ref={groupRef}
            position={rest.position}
            rotation={rest.rotation}
        >
            {children}
        </group>
    );
}

export default Mesh;
