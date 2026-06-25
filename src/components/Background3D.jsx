import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

const makeRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  ));

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
};

const canCreateWebGLContext = () => {
  if (typeof document === "undefined") return true;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
};

const useSupportsWebGL = () => {
  const [supportsWebGL, setSupportsWebGL] = useState(canCreateWebGLContext);

  useEffect(() => {
    setSupportsWebGL(canCreateWebGLContext());
  }, []);

  return supportsWebGL;
};

function FallbackBackground({ isDark }) {
  return (
    <div
      className={`absolute inset-0 transition-colors duration-700 ${
        isDark
          ? "bg-[radial-gradient(circle_at_18%_34%,rgba(34,211,238,0.16),transparent_22%),radial-gradient(circle_at_82%_58%,rgba(124,58,237,0.18),transparent_24%),linear-gradient(135deg,#030712,#07111f_48%,#030712)]"
          : "bg-[radial-gradient(circle_at_18%_34%,rgba(245,158,11,0.18),transparent_22%),radial-gradient(circle_at_82%_58%,rgba(14,165,233,0.16),transparent_24%),linear-gradient(135deg,#f8fbff,#edf7ff_48%,#fff7ed)]"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-25 ${
          isDark
            ? "bg-[linear-gradient(to_right,rgba(34,211,238,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.14)_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,rgba(245,158,11,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.14)_1px,transparent_1px)]"
        } bg-[size:84px_84px]`}
      />
    </div>
  );
}

function NodeField({ points, color }) {
  const meshRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const matrix = new THREE.Matrix4();
    points.forEach((point, index) => {
      const scale = index % 5 === 0 ? 1.35 : 1;
      matrix.compose(
        point,
        new THREE.Quaternion(),
        new THREE.Vector3(scale, scale, scale)
      );
      meshRef.current.setMatrixAt(index, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [points]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.025;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, points.length]}>
        <sphereGeometry args={[0.065, 10, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.1}
          roughness={0.35}
        />
      </instancedMesh>
    </group>
  );
}

function NetworkLines({ connections, color, isMobile }) {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.018;
  });

  return (
    <group ref={groupRef}>
      {connections.map(([start, end], index) => (
        <Line
          key={`${index}-${start.x.toFixed(2)}-${end.x.toFixed(2)}`}
          points={[start, end]}
          color={color}
          transparent
          opacity={isMobile ? 0.2 : 0.28}
          lineWidth={1}
          depthWrite={false}
        />
      ))}
    </group>
  );
}

function FloatingShapes({ isDark, isMobile }) {
  const palette = isDark
    ? ["#06b6d4", "#7c3aed", "#10b981"]
    : ["#f59e0b", "#fb923c", "#0ea5e9"];

  const materialProps = {
    transparent: true,
    opacity: isMobile ? 0.42 : 0.5,
    wireframe: true,
    roughness: 0.25,
  };

  return (
    <>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={0.9}>
        <mesh position={isMobile ? [-2.8, 1.7, -2.2] : [-5.2, 2.3, -2.5]}>
          <icosahedronGeometry args={[isMobile ? 0.68 : 0.95, 0]} />
          <meshStandardMaterial
            {...materialProps}
            color={palette[0]}
            emissive={palette[0]}
            emissiveIntensity={1.05}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={0.7}>
        <mesh position={isMobile ? [2.8, -1.8, -1.5] : [5.1, -1.3, -1.4]}>
          <torusGeometry args={[isMobile ? 0.58 : 0.9, 0.08, 12, 48]} />
          <meshStandardMaterial
            {...materialProps}
            color={palette[1]}
            emissive={palette[1]}
            emissiveIntensity={0.9}
          />
        </mesh>
      </Float>

      {!isMobile && (
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
          <mesh position={[0.5, 3.1, -3.2]}>
            <octahedronGeometry args={[0.92]} />
            <meshStandardMaterial
              {...materialProps}
              color={palette[2]}
              emissive={palette[2]}
              emissiveIntensity={0.92}
            />
          </mesh>
        </Float>
      )}
    </>
  );
}

function EnergyRings({ isDark, isMobile }) {
  const groupRef = useRef(null);
  const color = isDark ? "#22d3ee" : "#f59e0b";

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = clock.elapsedTime * 0.045;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.08;
  });

  if (isMobile) return null;

  return (
    <group ref={groupRef} position={[0.5, 0.1, -5.2]}>
      {[2.2, 3.4, 4.6].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2 + index * 0.22, 0, index * 0.4]}>
          <torusGeometry args={[radius, 0.006, 8, 160]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.16 - index * 0.025}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ isDark, isMobile }) {
  const { points, connections } = useMemo(() => {
    const random = makeRandom(1459);
    const pointCount = isMobile ? 30 : 58;
    const spread = isMobile
      ? { x: 7.5, y: 8.5, z: 5.5 }
      : { x: 14, y: 9.5, z: 7.5 };

    const generatedPoints = Array.from({ length: pointCount }, () => (
      new THREE.Vector3(
        (random() - 0.5) * spread.x,
        (random() - 0.5) * spread.y,
        (random() - 0.5) * spread.z
      )
    ));

    const generatedConnections = [];
    generatedPoints.forEach((point, index) => {
      const nearest = generatedPoints
        .map((candidate, candidateIndex) => ({
          candidate,
          candidateIndex,
          distance: point.distanceTo(candidate),
        }))
        .filter(({ candidateIndex, distance }) => candidateIndex > index && distance < (isMobile ? 2.5 : 3.15))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, isMobile ? 1 : 2);

      nearest.forEach(({ candidate }) => generatedConnections.push([point, candidate]));
    });

    return { points: generatedPoints, connections: generatedConnections };
  }, [isMobile]);

  const nodeColor = isDark ? "#22d3ee" : "#f59e0b";
  const lineColor = isDark ? "#8b5cf6" : "#fb923c";
  const fogColor = isDark ? "#030712" : "#f8fbff";

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, isMobile ? 8 : 9, isMobile ? 18 : 24]} />
      <ambientLight intensity={isDark ? 0.72 : 1.05} />
      <directionalLight position={[4, 6, 6]} intensity={isDark ? 1.2 : 1.35} color={nodeColor} />
      <pointLight position={[-5, -3, 4]} intensity={isDark ? 1.8 : 1.2} color={lineColor} />

      <NodeField points={points} color={nodeColor} />
      <NetworkLines connections={connections} color={lineColor} isMobile={isMobile} />
      <EnergyRings isDark={isDark} isMobile={isMobile} />
      <FloatingShapes isDark={isDark} isMobile={isMobile} />
    </>
  );
}

export default function Background3D({ isDark }) {
  const isMobile = useIsMobile();
  const supportsWebGL = useSupportsWebGL();

  return (
    <div
      className={`fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700 ${
        isDark ? "bg-[#030712]" : "bg-[#f8fbff]"
      }`}
      aria-hidden="true"
    >
      {supportsWebGL ? (
        <Canvas
          camera={{ position: [0, 0, isMobile ? 8.5 : 8], fov: isMobile ? 72 : 62 }}
          dpr={isMobile ? [1, 1.15] : [1, 1.6]}
          performance={{ min: 0.45 }}
          gl={{
            alpha: false,
            antialias: !isMobile,
            powerPreference: isMobile ? "low-power" : "high-performance",
          }}
          eventSource={typeof document !== "undefined" ? document.body : undefined}
          eventPrefix="client"
          fallback={<FallbackBackground isDark={isDark} />}
        >
          <Scene isDark={isDark} isMobile={isMobile} />
        </Canvas>
      ) : (
        <FallbackBackground isDark={isDark} />
      )}

      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-[radial-gradient(circle_at_30%_20%,rgba(8,145,178,0.1),transparent_34%),linear-gradient(to_bottom,rgba(3,7,18,0.01),rgba(3,7,18,0.46))]"
            : "bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.14),transparent_34%),linear-gradient(to_bottom,rgba(248,251,255,0.06),rgba(248,251,255,0.5))]"
        }`}
      />
    </div>
  );
}
