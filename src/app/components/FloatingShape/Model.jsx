import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Float, Text3D, useFont } from '@react-three/drei';
import { useSpring } from 'framer-motion';
import Mesh from './Mesh';

const FONT = '/fonts/helvetiker_bold.typeface.json';
useFont.preload(FONT);

const glyphBevel = {
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.55,
    bevelSize: 0.32,
    bevelOffset: 0,
    bevelSegments: 8,
};

function GlyphMaterial() {
    return (
        <meshPhysicalMaterial
            color='#2a46d0'
            roughness={0.3}
            metalness={0.86}
            clearcoat={0}
            reflectivity={0.9}
            envMapIntensity={1.05}
        />
    );
}

function AppearFromDistance({
    delay = 0,
    duration = 0.5,
    fromScale = 0,
    fromRotateY = 0,
    children,
}) {
    const groupRef = useRef(null);
    const startedAt = useRef(null);
    const finished = useRef(false);

    useFrame(({ clock }) => {
        const group = groupRef.current;
        if (!group || finished.current) return;

        if (startedAt.current == null) {
            startedAt.current = clock.elapsedTime;
            group.scale.setScalar(fromScale);
            group.rotation.y = fromRotateY;
        }

        const t = Math.min(
            1,
            Math.max(0, (clock.elapsedTime - startedAt.current - delay) / duration)
        );
        const eased = t * t * (3 - 2 * t);
        group.scale.setScalar(fromScale + (1 - fromScale) * eased);
        group.rotation.y = fromRotateY * (1 - eased);

        if (t >= 1) finished.current = true;
    });

    return (
        <group
            ref={(node) => {
                groupRef.current = node;
                if (node && startedAt.current == null) {
                    node.scale.setScalar(fromScale);
                    node.rotation.y = fromRotateY;
                }
            }}
        >
            {children}
        </group>
    );
}

const heroGlyphs = [
    {
        text: '{',
        position: [-46, 7, 0],
        rotation: [0.12, 0.48, -0.1],
        multiplier: 1.15,
        drift: 0.38,
        size: 22,
        height: 5.2,
        floatSpeed: 0.7,
        floatAmt: 0.28,
        floatRot: 0.18,
    },
    {
        text: '}',
        position: [46, 5, 0],
        rotation: [-0.08, -0.48, 0.08],
        multiplier: 1.15,
        drift: 0.38,
        invertY: -1,
        size: 22,
        height: 5.2,
        floatSpeed: 0.85,
        floatAmt: 0.28,
        floatRot: 0.18,
    },
    {
        text: '</>',
        position: [-4, 46, 1],
        rotation: [0.1, 0.22, -0.03],
        multiplier: 1.45,
        drift: 0.55,
        invertX: -1,
        size: 13,
        height: 4,
        floatSpeed: 1.2,
        floatAmt: 0.55,
        floatRot: 0.28,
    },
    {
        text: 'UI',
        position: [34, -34, 1],
        rotation: [0.08, -0.22, 0.04],
        multiplier: 1.7,
        drift: 0.62,
        invertY: -1,
        size: 20,
        height: 5.4,
        floatSpeed: 1.15,
        floatAmt: 0.75,
        floatRot: 0.32,
    },
    {
        text: 'UX',
        position: [-34, -34, -1],
        rotation: [-0.08, 0.24, -0.04],
        multiplier: 1.7,
        drift: 0.62,
        invertX: -1,
        size: 20,
        height: 5.4,
        floatSpeed: 1.4,
        floatAmt: 0.8,
        floatRot: 0.34,
    },
    {
        text: '=>',
        position: [64, 4, 1],
        rotation: [0.1, -0.38, 0.12],
        multiplier: 1.5,
        drift: 0.68,
        invertX: -1,
        invertY: -1,
        size: 12,
        height: 3.8,
        floatSpeed: 1.55,
        floatAmt: 0.65,
        floatRot: 0.42,
    },
    {
        text: '[',
        position: [-64, -10, 0],
        rotation: [0.16, 0.26, -0.1],
        multiplier: 1.25,
        drift: 0.5,
        invertY: -1,
        size: 14,
        height: 4,
        floatSpeed: 1.05,
        floatAmt: 0.5,
        floatRot: 0.28,
    },
    {
        text: ']',
        position: [-50, -12, 0],
        rotation: [-0.12, -0.22, 0.08],
        multiplier: 1.25,
        drift: 0.5,
        invertX: -1,
        size: 14,
        height: 4,
        floatSpeed: 0.95,
        floatAmt: 0.5,
        floatRot: 0.28,
    },
    {
        text: '#',
        position: [58, -16, 0],
        rotation: [-0.14, -0.3, 0.08],
        multiplier: 1.3,
        drift: 0.55,
        invertX: -1,
        size: 15,
        height: 4.2,
        floatSpeed: 1.1,
        floatAmt: 0.55,
        floatRot: 0.3,
    },
    {
        text: '&&',
        position: [0, -36, 0],
        rotation: [0.06, 0.18, -0.03],
        multiplier: 1.4,
        drift: 0.48,
        invertY: -1,
        size: 12,
        height: 3.6,
        floatSpeed: 1.25,
        floatAmt: 0.6,
        floatRot: 0.26,
    },
];

const contactGlyphs = [
    {
        text: '{',
        position: [-36, 18, 0],
        rotation: [0.12, 0.38, -0.08],
        multiplier: 1.35,
        size: 14.5,
        height: 3.8,
    },
    {
        text: '</>',
        position: [10, 24, 1],
        rotation: [-0.08, -0.26, 0.05],
        multiplier: 1.45,
        size: 10.5,
        height: 3.3,
    },
    {
        text: '()',
        position: [34, 8, 0],
        rotation: [0.1, -0.32, 0.08],
        multiplier: 1.4,
        size: 12.5,
        height: 3.5,
    },
    {
        text: '=>',
        position: [30, -16, 1],
        rotation: [0.12, -0.34, 0.1],
        multiplier: 1.4,
        size: 11.5,
        height: 3.3,
    },
    {
        text: '&&',
        position: [-32, -14, 0],
        rotation: [-0.1, 0.28, -0.06],
        multiplier: 1.3,
        size: 11.5,
        height: 3.3,
    },
    {
        text: '#',
        position: [-2, -24, 0],
        rotation: [0.08, 0.22, 0.06],
        multiplier: 1.35,
        size: 13.5,
        height: 3.6,
    },
];

function Glyph({ glyph, mouse, intensity, independentFloat = false }) {
    const mesh = (
        <Mesh
            mouse={mouse}
            multiplier={glyph.multiplier}
            intensity={intensity}
            position={glyph.position}
            rotation={glyph.rotation}
            invertX={glyph.invertX ?? 1}
            invertY={glyph.invertY ?? 1}
            drift={glyph.drift ?? 1}
        >
            <Center>
                <Text3D
                    font={FONT}
                    size={glyph.size}
                    height={glyph.height}
                    {...glyphBevel}
                >
                    {glyph.text}
                    <GlyphMaterial />
                </Text3D>
            </Center>
        </Mesh>
    );

    if (!independentFloat) return mesh;

    return (
        <Float
            speed={glyph.floatSpeed ?? 1}
            rotationIntensity={glyph.floatRot ?? 0.35}
            floatIntensity={glyph.floatAmt ?? 0.55}
            floatingRange={[-0.9, 0.9]}
        >
            {mesh}
        </Float>
    );
}

function ClusterDrift({ lean, attract, children }) {
    const groupRef = useRef(null);
    const attractRef = useRef(attract);
    attractRef.current = attract;

    useFrame(({ clock }) => {
        const group = groupRef.current;
        if (!group) return;
        const t = clock.elapsedTime;
        const amount = lean ? lean.get() : 0;
        const pull = attractRef.current;
        const ax = (pull?.x ?? -0.9) * amount;
        const ay = (pull?.y ?? 0) * amount;
        const idle = 1 - amount;
        group.rotation.y =
            t * 0.18 * idle + Math.sin(t * 0.35) * 0.16 * idle + ax * 0.28;
        group.rotation.x = Math.sin(t * 0.28) * 0.14 * idle - ay * 0.22;
        group.rotation.z = Math.cos(t * 0.21) * 0.07 * idle;
        group.position.y = Math.sin(t * 0.55) * 2.2 * idle - ay * 34;
        group.position.x = Math.cos(t * 0.32) * 1.4 * idle + ax * 52;
    });

    return <group ref={groupRef}>{children}</group>;
}

function Gather({ lean, children }) {
    const groupRef = useRef(null);

    useFrame(() => {
        const group = groupRef.current;
        if (!group) return;
        const t = lean ? lean.get() : 0;
        group.scale.setScalar(1 - t * 0.48);
    });

    return <group ref={groupRef}>{children}</group>;
}

function StaggerAppear({
    active,
    index,
    count,
    fromX = 110,
    fromScale = 0,
    fromRotateY = 0.4,
    children,
}) {
    const groupRef = useRef(null);
    const progress = useSpring(0, { stiffness: 68, damping: 18, mass: 0.75 });

    useEffect(() => {
        const delay = (active ? index : count - 1 - index) * 95;
        const id = setTimeout(() => progress.set(active ? 1 : 0), delay);
        return () => clearTimeout(id);
    }, [active, index, count, progress]);

    useFrame(() => {
        const group = groupRef.current;
        if (!group) return;
        const t = progress.get();
        const eased = t * t * (3 - 2 * t);
        group.scale.setScalar(fromScale + (1 - fromScale) * eased);
        group.position.x = fromX * (1 - eased);
        group.rotation.y = fromRotateY * (1 - eased);
    });

    return (
        <group
            ref={(node) => {
                groupRef.current = node;
                if (node && progress.get() === 0) {
                    node.scale.setScalar(fromScale);
                    node.position.x = fromX;
                    node.rotation.y = fromRotateY;
                }
            }}
        >
            {children}
        </group>
    );
}

const Model = ({
    mouse,
    variant = 'hero',
    intensity,
    excited = false,
    inView = false,
    lean,
    attract,
}) => {
    const isContact = variant === 'contact';

    if (isContact) {
        return (
            <Float
                speed={excited ? 0.55 : 1.05}
                rotationIntensity={excited ? 0.2 : 0.48}
                floatIntensity={excited ? 0.28 : 0.72}
            >
                <ClusterDrift lean={lean} attract={attract}>
                    <Gather lean={lean}>
                        <group scale={0.84}>
                            {contactGlyphs.map((glyph, index) => (
                                <StaggerAppear
                                    key={glyph.text}
                                    active={inView}
                                    index={index}
                                    count={contactGlyphs.length}
                                >
                                    <Glyph
                                        glyph={glyph}
                                        mouse={mouse}
                                        intensity={intensity}
                                    />
                                </StaggerAppear>
                            ))}
                        </group>
                    </Gather>
                </ClusterDrift>
            </Float>
        );
    }

    return (
        <AppearFromDistance delay={0} duration={2.2} fromScale={0.5}>
            <group scale={1.08}>
                {heroGlyphs.map((glyph, index) => (
                    <AppearFromDistance
                        key={`${glyph.text}-${index}`}
                        delay={index * 0.08}
                        duration={0.5}
                        fromScale={0}
                        fromRotateY={0.5}
                    >
                        <Glyph
                            glyph={glyph}
                            mouse={mouse}
                            intensity={intensity}
                            independentFloat
                        />
                    </AppearFromDistance>
                ))}
            </group>
        </AppearFromDistance>
    );
};

export default Model;
