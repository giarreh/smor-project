import { useLayoutEffect, useRef } from "react";
import {
  AmbientLight,
  AnimationMixer,
  Clock,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  BoxGeometry,
  TorusGeometry,
  TetrahedronGeometry,
  WebGLRenderer,
} from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { Global, css } from "@emotion/react";

// Type for canvas reference
type CanvasRef = HTMLCanvasElement | null;

export default function AvocadoThreejs() {
  const canvasRef = useRef<CanvasRef>(null);
  const modelRef = useRef<Object3D | null>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);
  const clock = new Clock();

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    // Renderer
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.shadowMap.enabled = true;

    // Camera
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 3, 10);

    // Scene
    const scene = new Scene();
    scene.background = new Color(0xbfe3ff);

    // Lights
    const directionalLight = new DirectionalLight(0xffffff, 3);
    directionalLight.castShadow = true;
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    // Load GLTF Model
    const container = new Object3D();
    scene.add(container);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/yippie.glb",
      (gltf: GLTF) => {
        const object = gltf.scene;
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, 0);
        object.castShadow = true;
        container.add(object);

        if (gltf.animations.length > 0) {
          const mixer = new AnimationMixer(object);
          mixerRef.current = mixer;
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        modelRef.current = object;
      },
      (xhr: ProgressEvent<EventTarget>) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error: unknown) => {
        const err = error as ErrorEvent;
        console.error("An error occurred:", err);
      }
    );

    // Rotating Sphere
    const sphere = new Mesh(
      new SphereGeometry(0.5, 32, 32),
      new MeshStandardMaterial({ color: 0xff6347 })
    );
    sphere.position.set(2, 1, -2);
    sphere.castShadow = true;
    scene.add(sphere);

    // Spinning Cube
    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ color: 0x6a5acd })
    );
    cube.position.set(-2, 1, 2);
    cube.castShadow = true;
    scene.add(cube);

    // Rotating Torus 
    const torus = new Mesh(
      new TorusGeometry(5, 0.8, 16, 100),
      new MeshStandardMaterial({ color: 0xffd700 })
    );
    torus.position.set(0, 2, 0);
    torus.castShadow = true;
    scene.add(torus);

    // Tetrahedron (Pyramid Shape)
    const pyramid = new Mesh(
      new TetrahedronGeometry(1),
      new MeshStandardMaterial({ color: 0x00ff7f })
    );
    pyramid.position.set(3, 0.8, 3);
    pyramid.castShadow = true;
    scene.add(pyramid);

    // Floating Spheres (Random Positions)
    const floatingSpheres: Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const floatSphere = new Mesh(
        new SphereGeometry(0.3, 16, 16),
        new MeshStandardMaterial({ color: Math.random() * 0xffffff })
      );
      floatSphere.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 5 + 1,
        (Math.random() - 0.5) * 20
      );
      floatSphere.castShadow = true;
      scene.add(floatSphere);
      floatingSpheres.push(floatSphere);
    }

    // Animation Loop
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixerRef.current?.update(delta);

      // Rotate objects
      sphere.rotation.y += 0.01;
      cube.rotation.x += 0.01;
      torus.rotation.z += 0.02;
      pyramid.rotation.y -= 0.015;

      // Floating effect for spheres
      floatingSpheres.forEach((sphere, index) => {
        sphere.position.y += Math.sin(clock.elapsedTime + index) * 0.005;
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    new OrbitControls(camera, renderer.domElement);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            height: 100%;
          }
        `}
      />
      <h2 style={{ textAlign: "center" }}>Avocado mannen hilser!</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          background: "linear-gradient(to top, #bfe3ff, #ffffff)",
        }}
      >
        <canvas
          style={{
            width: "90%",
            height: "90%",
            display: "block",
          }}
          ref={canvasRef}
        />
      </div>
    </>
  );
}
