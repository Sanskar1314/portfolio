"use client";
import {
  Component,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Worlds } from "./worlds";
import { smooth, timeline } from "@/lib/timeline";
import { screenVertex, spaceFragment } from "@/lib/shaders/space";

class Boundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function Background({ paused, low }: { paused: boolean; low: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uAspect: { value: 1 },
      uQuality: { value: low ? 0 : 1 },
    }),
    [low],
  );
  useFrame(({ size }, dt) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    if (!paused) u.uTime.value += dt;
    u.uProgress.value = timeline.progress;
    u.uAspect.value = size.width / size.height;
  });
  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={screenVertex}
        fragmentShader={spaceFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
function Starfield({ low, paused }: { low: boolean; paused: boolean }) {
  const lines = useRef<THREE.LineSegments>(null);
  const clock = useRef(0);
  const count = low ? 280 : 900;
  const { data, seed } = useMemo(() => {
    const rand = (n: number) => {
      const v = Math.sin(n * 127.1 + 714) * 43758.5453;
      return v - Math.floor(v);
    };
    const seed = Array.from({ length: count }, (_, i) => ({
      x: (rand(i * 3) - 0.5) * 38,
      y: (rand(i * 3 + 1) - 0.5) * 25,
      z: rand(i * 3 + 2) * 45,
    }));
    return { data: new Float32Array(count * 6), seed };
  }, [count]);
  useFrame((_, dt) => {
    if (!lines.current) return;
    if (!paused) clock.current += dt;
    const p = timeline.progress;
    const warp = smooth(0.065, 0.17, p) * (1 - smooth(0.22, 0.275, p));
    const sparsity = 1 - smooth(0.79, 0.9, p) * 0.95;
    const attr = lines.current.geometry.attributes
      .position as THREE.BufferAttribute;
    seed.forEach((s, i) => {
      const z = -((s.z + p * 260 + clock.current * 0.14) % 45) + 3;
      const idx = i * 6;
      data[idx] = s.x;
      data[idx + 1] = s.y;
      data[idx + 2] = z;
      data[idx + 3] = s.x;
      data[idx + 4] = s.y;
      data[idx + 5] = z + 0.014 + warp * 2.9;
    });
    attr.needsUpdate = true;
    (lines.current.material as THREE.LineBasicMaterial).opacity =
      0.52 * sparsity;
  });
  return (
    <lineSegments ref={lines} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#a9c5e5"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </lineSegments>
  );
}
function CameraRig({
  onFailure,
  low,
}: {
  onFailure: () => void;
  low: boolean;
}) {
  const { gl, setDpr } = useThree();
  const average = useRef({ frames: 0, time: 0, adjusted: false });
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost);
    canvas.setAttribute("data-ready", "true");
    return () => {
      canvas.removeAttribute("data-ready");
      canvas.removeEventListener("webglcontextlost", lost);
    };
  }, [gl, onFailure]);
  useFrame(({ camera }, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    const warp =
      smooth(0.065, 0.17, timeline.progress) *
      (1 - smooth(0.22, 0.275, timeline.progress));
    cam.fov = 45 + warp * 14;
    cam.updateProjectionMatrix();
    const a = average.current;
    if (!a.adjusted && dt < 0.2) {
      a.frames++;
      a.time += dt;
      if (a.frames === 90) {
        if (a.time > 2.3) setDpr(low ? 0.75 : 1);
        a.adjusted = true;
      }
    }
  });
  return null;
}
export default function Universe({
  onFailure,
  paused,
}: {
  onFailure: () => void;
  paused: boolean;
}) {
  const [low] = useState(
    () =>
      typeof window !== "undefined" &&
      (innerWidth < 800 || navigator.hardwareConcurrency <= 4),
  );
  return (
    <div className="universe" aria-hidden="true">
      <Boundary onFailure={onFailure}>
        <Canvas
          dpr={low ? 1 : [1, 1.5]}
          camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 75 }}
          gl={{
            antialias: !low,
            alpha: false,
            powerPreference: low ? "low-power" : "high-performance",
          }}
          fallback={
            <span>
              3D rendering unavailable. All portfolio content remains accessible
              below.
            </span>
          }
        >
          <Background paused={paused} low={low} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[-4, 5, 4]}
            intensity={2}
            color="#bfccdc"
          />
          <pointLight position={[4, -1, 2]} intensity={8} color="#c48b52" />
          <Starfield low={low} paused={paused} />
          <Worlds low={low} paused={paused} />
          <CameraRig low={low} onFailure={onFailure} />
        </Canvas>
      </Boundary>
    </div>
  );
}
