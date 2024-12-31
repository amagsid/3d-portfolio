import { useGLTF } from '@react-three/drei';

const Model = () => {
    const { nodes } = useGLTF('/media/floating_shapes4.glb');
    return (
        <group>
            <Mesh node={nodes.Sphere003} />
        </group>
    );
};

function Mesh({ node }) {
    const {
        castShadow,
        receiveShadow,
        geometry,
        material,
        position,
        rotation,
        scale,
    } = node;

    return (
        <mesh
            castShadow={castShadow}
            receiveShadow={receiveShadow}
            geometry={geometry}
            material={material}
            position={position}
            rotation={rotation}
            scale={scale}
        />
    );
}

useGLTF.preload('/media/floating_shapes4.glb');

export default Model;
