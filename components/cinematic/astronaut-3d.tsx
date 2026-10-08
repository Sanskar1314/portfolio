"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { smooth, timeline } from "@/lib/timeline";
type V3 = [number, number, number];
const cream = "#d5d1bf",
  dark = "#26313a",
  gold = "#b39560";
function Panel({
  position,
  scale,
  color = cream,
}: {
  position: V3;
  scale: V3;
  color?: string;
}) {
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.12), []);
  return (
    <mesh position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.48} metalness={0.22} />
    </mesh>
  );
}
function Joint({
  position,
  radius,
  rotation = [0, 0, 0],
}: {
  position: V3;
  radius: number;
  rotation?: V3;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, 0.13, 24]} />
      <meshStandardMaterial color={dark} roughness={0.75} />
    </mesh>
  );
}
function Hose({ side }: { side: number }) {
  const geometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.24, 0.18, 0.29),
          new THREE.Vector3(side * 0.47, -0.05, 0.32),
          new THREE.Vector3(side * 0.38, -0.43, 0.18),
          new THREE.Vector3(side * 0.3, -0.32, -0.2),
        ]),
        24,
        0.035,
        8,
        false,
      ),
    [side],
  );
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={gold} roughness={0.5} metalness={0.5} />
    </mesh>
  );
}
export function Astronaut3D({ paused }: { paused: boolean }) {
  const root = useRef<THREE.Group>(null),
    body = useRef<THREE.Group>(null);
  const idle = useRef(0);
  useFrame(({ camera, viewport, size, gl }, dt) => {
    if (!root.current || !body.current) return;
    if (!paused) idle.current += dt;
    const p = timeline.progress,
      small = size.width < 900;
    const alpha = 1;
    root.current.visible = alpha > 0.001;
    if (!root.current.visible) return;
    // All travel after launch is along the depth axis. No chapter-specific left/right stops.
    const z = -smooth(0.06, 0.24, p) * 38 - smooth(0.24, 1, p) * 38;
    const view = viewport.getCurrentViewport(
      camera,
      new THREE.Vector3(0, 0, z),
    );
    const y =
      (small ? 0.13 : 0.02) +
      ((small ? -0.41 : -0.37) - (small ? 0.13 : 0.02)) * smooth(0.07, 0.24, p);
    root.current.position.set(
      view.width * (small ? -0.21 : -0.25),
      view.height * y,
      z,
    );
    root.current.scale.setScalar(
      (small ? 1.05 : 1.2) * (1 - smooth(0.1, 0.24, p) * (small ? 0.42 : 0.12)),
    );
    body.current.rotation.set(
      -0.1 * smooth(0.07, 0.2, p),
      Math.PI * smooth(0.085, 0.17, p),
      0.025 * Math.sin(idle.current * 0.5),
    );
    root.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const m = obj.material as THREE.MeshStandardMaterial;
        m.transparent = alpha < 1;
        m.opacity = alpha;
      }
    });
    gl.domElement.setAttribute("data-progress", p.toFixed(5));
    gl.domElement.setAttribute("data-traveler-z", z.toFixed(3));
    gl.domElement.setAttribute(
      "data-traveler-x",
      (small ? 0.29 : 0.25).toString(),
    );
    gl.domElement.setAttribute("data-traveler-3d", "true");
  });
  return (
    <group ref={root} visible={false}>
      <group ref={body}>
        <Panel
          position={[0, 0.08, -0.29]}
          scale={[0.77, 1.03, 0.35]}
          color={dark}
        />
        <Panel position={[0, 0.12, -0.49]} scale={[0.65, 0.82, 0.14]} />
        <Panel
          position={[0, 0.14, -0.58]}
          scale={[0.47, 0.55, 0.07]}
          color={dark}
        />
        {[-1, 1].map((side) => (
          <group key={side}>
            <Panel
              position={[side * 0.3, 0.18, -0.55]}
              scale={[0.055, 0.64, 0.075]}
              color={gold}
            />
            <mesh position={[side * 0.34, -0.2, -0.35]}>
              <capsuleGeometry args={[0.1, 0.51, 8, 16]} />
              <meshStandardMaterial
                color={cream}
                metalness={0.4}
                roughness={0.4}
              />
            </mesh>
          </group>
        ))}
        <Panel position={[0, 0.1, 0]} scale={[0.78, 0.85, 0.5]} />
        <Panel
          position={[0, -0.4, 0]}
          scale={[0.66, 0.22, 0.47]}
          color={dark}
        />
        <Panel
          position={[0, 0.2, 0.29]}
          scale={[0.46, 0.37, 0.095]}
          color={dark}
        />
        <Panel
          position={[0, 0.23, 0.35]}
          scale={[0.31, 0.12, 0.025]}
          color="#6a8d9c"
        />
        {[-0.11, 0, 0.11].map((x) => (
          <mesh
            key={x}
            position={[x, 0.085, 0.35]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.03, 16]} />
            <meshStandardMaterial
              color={gold}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        ))}
        <Joint position={[0, 0.6, 0]} radius={0.3} />
        <mesh position={[0, 0.95, 0]} scale={[0.4, 0.43, 0.37]}>
          <sphereGeometry args={[1, 40, 32]} />
          <meshStandardMaterial
            color={cream}
            metalness={0.35}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0, 0.96, 0.2]} scale={[0.33, 0.29, 0.24]}>
          <sphereGeometry args={[1, 40, 32]} />
          <meshPhysicalMaterial
            color="#14202c"
            metalness={0.85}
            roughness={0.16}
            clearcoat={1}
          />
        </mesh>
        <mesh position={[-0.14, 1.08, 0.402]} scale={[0.075, 0.035, 0.012]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshBasicMaterial color="#b7d6e4" />
        </mesh>
        <Panel
          position={[0, 1.27, -0.02]}
          scale={[0.19, 0.06, 0.2]}
          color={gold}
        />
        {[-1, 1].map((side) => (
          <group key={side}>
            <group
              position={[side * 0.47, 0.34, 0]}
              rotation={[0, 0, side * 0.22]}
            >
              <mesh position={[0, -0.17, 0]}>
                <capsuleGeometry args={[0.17, 0.25, 8, 24]} />
                <meshStandardMaterial color={cream} roughness={0.7} />
              </mesh>
              <Joint position={[0, -0.43, 0]} radius={0.145} />
              <mesh position={[0, -0.62, 0.025]}>
                <capsuleGeometry args={[0.14, 0.2, 8, 24]} />
                <meshStandardMaterial color={cream} roughness={0.65} />
              </mesh>
              <Joint position={[0, -0.8, 0.03]} radius={0.135} />
              <Panel
                position={[0, -0.91, 0.045]}
                scale={[0.22, 0.25, 0.23]}
                color={dark}
              />
              <Panel
                position={[side * -0.1, -0.87, 0.12]}
                scale={[0.09, 0.16, 0.12]}
              />
              <Panel
                position={[0, -0.16, 0.16]}
                scale={[0.14, 0.15, 0.035]}
                color={gold}
              />
            </group>
            <group
              position={[side * 0.21, -0.53, 0]}
              rotation={[0, 0, side * 0.035]}
            >
              <mesh position={[0, -0.24, 0]}>
                <capsuleGeometry args={[0.185, 0.29, 8, 24]} />
                <meshStandardMaterial color={cream} roughness={0.75} />
              </mesh>
              <Joint position={[0, -0.51, 0]} radius={0.168} />
              <Panel
                position={[0, -0.5, 0.15]}
                scale={[0.22, 0.19, 0.08]}
                color={dark}
              />
              <mesh position={[0, -0.77, 0]}>
                <capsuleGeometry args={[0.155, 0.28, 8, 24]} />
                <meshStandardMaterial color={cream} roughness={0.7} />
              </mesh>
              <Joint position={[0, -1.0, 0]} radius={0.15} />
              <Panel position={[0, -1.14, 0.07]} scale={[0.31, 0.28, 0.45]} />
              <Panel
                position={[0, -1.28, 0.08]}
                scale={[0.32, 0.07, 0.47]}
                color={dark}
              />
            </group>
            <Hose side={side} />
          </group>
        ))}
      </group>
    </group>
  );
}
