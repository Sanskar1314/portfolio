"use client";
import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { smooth, timeline } from "@/lib/timeline";

export function Astronaut3D({ paused }: { paused: boolean }) {
  const gltf = useLoader(GLTFLoader, "/models/explorer-suit.glb");
  const model = useMemo(() => {
    // Batch the editable Blender pieces by material for a small number of draw calls.
    gltf.scene.updateMatrixWorld(true);
    const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
    gltf.scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const geometry = object.geometry.index
        ? object.geometry.toNonIndexed()
        : object.geometry.clone();
      geometry.applyMatrix4(object.matrixWorld);
      for (const name of Object.keys(geometry.attributes)) {
        if (
          name !== "position" &&
          name !== "normal" &&
          !(
            name === "uv" &&
            (object.material as THREE.Material).name === "Portrait_inside_visor"
          )
        )
          geometry.deleteAttribute(name);
      }
      const material = object.material as THREE.Material;
      const batch = batches.get(material) ?? [];
      batch.push(geometry);
      batches.set(material, batch);
    });
    const group = new THREE.Group();
    for (const [material, geometries] of batches) {
      const merged = mergeGeometries(geometries);
      if (merged) group.add(new THREE.Mesh(merged, material));
      geometries.forEach((geometry) => geometry.dispose());
    }
    const bounds = new THREE.Box3().setFromObject(group);
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = 3.16 / bounds.getSize(new THREE.Vector3()).y;
    group.scale.setScalar(scale);
    group.position.copy(center.multiplyScalar(-scale));
    return group;
  }, [gltf]);
  const root = useRef<THREE.Group>(null),
    body = useRef<THREE.Group>(null);
  const idle = useRef(0);
  useFrame(({ camera, viewport, size, gl }, dt) => {
    if (!root.current || !body.current) return;
    if (!paused) idle.current += dt;
    const p = timeline.progress,
      small = size.width < 900,
      phone = size.width < 560;
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
      (phone ? 0.24 : small ? 0.13 : 0.02) +
      ((small ? -0.41 : -0.37) - (phone ? 0.24 : small ? 0.13 : 0.02)) *
        smooth(0.07, 0.24, p);
    root.current.position.set(
      view.width * (phone ? 0 : small ? -0.21 : -0.25),
      view.height * y,
      z,
    );
    root.current.scale.setScalar(
      (phone ? 0.62 : small ? 0.92 : 1.2) *
        (1 - smooth(0.1, 0.24, p) * (small ? 0.42 : 0.12)),
    );
    body.current.rotation.set(
      -0.1 * smooth(0.07, 0.2, p),
      Math.PI * smooth(0.085, 0.17, p),
      0.025 * Math.sin(idle.current * 0.5),
    );
    gl.domElement.setAttribute("data-progress", p.toFixed(5));
    gl.domElement.setAttribute("data-traveler-z", z.toFixed(3));
    gl.domElement.setAttribute(
      "data-traveler-x",
      (phone ? 0.5 : small ? 0.29 : 0.25).toString(),
    );
    gl.domElement.setAttribute("data-traveler-3d", "true");
  });
  return (
    <group ref={root} visible={false}>
      <group ref={body}>
        <primitive object={model} />
      </group>
    </group>
  );
}
