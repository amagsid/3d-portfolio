import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTransform } from 'framer-motion';
import * as THREE from 'three';

const MAGNET_SPRING = 0.18;
const MAGNET_DAMP = 0.76;

function Mesh({
    mouse,
    multiplier,
    intensity,
    magnetRef,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    invertX = 1,
    invertY = 1,
    drift = 1,
    children,
}) {
    const groupRef = useRef(null);
    const motion = useRef({
        x: position[0],
        y: position[1],
        rx: rotation[1],
        ry: rotation[0],
        vx: 0,
        vy: 0,
        vrx: 0,
        vry: 0,
    });
    const scratch = useMemo(
        () => ({
            restWorld: new THREE.Vector3(),
            target: new THREE.Vector3(),
        }),
        []
    );
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

    useFrame((state) => {
        const group = groupRef.current;
        if (!group) return;

        const pull = magnetRef?.current;
        const parent = group.parent;
        let nextX = rest.position[0];
        let nextY = rest.position[1];
        let nextRotX = rest.rotation[0];
        let nextRotY = rest.rotation[1];

        if (pull && parent) {
            const { restWorld, target } = scratch;
            const { width, height } = state.viewport;
            restWorld.set(rest.position[0], rest.position[1], rest.position[2]);
            parent.localToWorld(restWorld);
            const magnetX = pull.x * width;
            const magnetY = -pull.y * height;
            const dx = magnetX - restWorld.x;
            const dy = magnetY - restWorld.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 0.0001) {
                const influence = Math.max(width, height) * 2.1;
                const maxPull = Math.max(8, Math.min(width, height) * 0.11);
                const t = Math.max(0, 1 - dist / influence);
                const falloff = t * t * (3 - 2 * t);
                const shift = Math.min(dist, maxPull * Math.max(0.28, falloff));
                target.set(
                    restWorld.x + (dx / dist) * shift,
                    restWorld.y + (dy / dist) * shift,
                    restWorld.z
                );
                parent.worldToLocal(target);
                nextX = target.x;
                nextY = target.y;
            }
            nextRotX = rest.rotation[1];
            nextRotY = rest.rotation[0];
        } else {
            const boost = intensity ? intensity.get() : 1;
            nextX =
                rest.position[0] + (positionX.get() - rest.position[0]) * boost;
            nextY =
                rest.position[1] + (positionY.get() - rest.position[1]) * boost;
            nextRotX =
                rest.rotation[1] + (rotationY.get() - rest.rotation[1]) * boost;
            nextRotY =
                rest.rotation[0] + (rotationX.get() - rest.rotation[0]) * boost;
        }

        if (magnetRef) {
            const m = motion.current;
            m.vx += (nextX - m.x) * MAGNET_SPRING;
            m.vy += (nextY - m.y) * MAGNET_SPRING;
            m.vrx += (nextRotX - m.rx) * MAGNET_SPRING;
            m.vry += (nextRotY - m.ry) * MAGNET_SPRING;
            m.vx *= MAGNET_DAMP;
            m.vy *= MAGNET_DAMP;
            m.vrx *= MAGNET_DAMP;
            m.vry *= MAGNET_DAMP;
            m.x += m.vx;
            m.y += m.vy;
            m.rx += m.vrx;
            m.ry += m.vry;
            group.position.set(m.x, m.y, rest.position[2]);
            group.rotation.set(m.rx, m.ry, rest.rotation[2]);
            return;
        }

        group.position.set(nextX, nextY, rest.position[2]);
        group.rotation.set(nextRotX, nextRotY, rest.rotation[2]);
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
