"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneBlend, skillState, timeline } from "@/lib/timeline";
import {
  planetVertex,
  planetFragment,
  atmosphereFragment,
} from "@/lib/shaders/space";
const colors = ["#73a9d0", "#cca37b", "#8eaccf", "#72aaa4", "#8e9eb4"];
function Planet({
  index,
  color,
  paused,
  low,
  skill = false,
}: {
  index: number;
  color: string;
  paused: boolean;
  low: boolean;
  skill?: boolean;
}) {
  const group = useRef<THREE.Group>(null),
    surface = useRef<THREE.Mesh>(null),
    material = useRef<THREE.ShaderMaterial>(null),
    atmosphere = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uKind: { value: index - 4 },
    }),
    [color, index],
  );
  const air = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0 },
    }),
    [color],
  );
  const palette = useMemo(() => colors.map((c) => new THREE.Color(c)), []);
  useFrame(({ viewport, size }, dt) => {
    if (
      !group.current ||
      !surface.current ||
      !material.current ||
      !atmosphere.current
    )
      return;
    const p = timeline.progress,
      blend = sceneBlend(index, p),
      small = size.width < 560,
      compact = size.width < 900;
    group.current.visible = blend.opacity > 0.001;
    if (!group.current.visible) return;
    if (!paused) {
      surface.current.rotation.y += dt * 0.035;
      material.current.uniforms.uTime.value += dt;
    }
    const side = index === 5 ? -1 : 1;
    const x = skill ? (compact ? -0.23 : -0.19) : small ? 0.2 : side * 0.29;
    const y = skill ? (compact ? -0.015 : -0.09) : small ? 0.24 : 0;
    const radius = skill
      ? compact
        ? 0.14
        : 0.22
      : small
        ? 0.17
        : compact
          ? 0.21
          : 0.29;
    group.current.position.set(
      viewport.width * x + (skill ? 0 : side * (1 - blend.opacity) * 0.65),
      viewport.height * y,
      -0.25,
    );
    group.current.scale.setScalar(
      viewport.height * radius * (0.96 + 0.04 * blend.opacity),
    );
    material.current.uniforms.uOpacity.value = blend.opacity;
    atmosphere.current.uniforms.uOpacity.value = blend.opacity;
    if (skill) {
      material.current.uniforms.uColor.value.lerp(
        palette[skillState.selected],
        1 - Math.exp(-dt * 5),
      );
      atmosphere.current.uniforms.uColor.value.copy(
        material.current.uniforms.uColor.value,
      );
      material.current.uniforms.uKind.value = skillState.selected;
    }
  });
  return (
    <group ref={group} visible={false}>
      <mesh ref={surface}>
        <sphereGeometry args={[1, low ? 48 : 80, low ? 32 : 64]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={planetVertex}
          fragmentShader={planetFragment}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.025}>
        <sphereGeometry args={[1, low ? 32 : 64, 32]} />
        <shaderMaterial
          ref={atmosphere}
          uniforms={air}
          vertexShader={planetVertex}
          fragmentShader={atmosphereFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
export function Worlds({ paused, low }: { paused: boolean; low: boolean }) {
  return (
    <>
      <Planet index={3} color={colors[0]} paused={paused} low={low} skill />
      <Planet index={4} color="#cb9972" paused={paused} low={low} />
      <Planet index={5} color="#79afd9" paused={paused} low={low} />
      <Planet index={6} color="#80b5a8" paused={paused} low={low} />
    </>
  );
}
