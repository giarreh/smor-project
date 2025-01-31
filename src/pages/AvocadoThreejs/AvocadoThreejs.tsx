import { useLayoutEffect, useRef } from "react"
import {
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  AnimationMixer,
  Clock,
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Global, css } from "@emotion/react"

export default function AvocadoThreejs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modelRef = useRef<Object3D | null>(null); // Store reference to loaded model
  const mixerRef = useRef<AnimationMixer | null>(null);
  const clock = new Clock(); // Needed to update animation
  useLayoutEffect(() => {
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current as HTMLCanvasElement,
      antialias: true,
      alpha: true,
    })

    const camera = new PerspectiveCamera(
      60, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      200 // far
    )
    const x = 0;
    const y = 1;
    const z = 8;
    camera.position.set(x,y,z)


    const scene = new Scene()

    // lights
    const directionalLight = new DirectionalLight(0xffffff, 0.2)
    directionalLight.castShadow = true
    directionalLight.position.set(-1, 2, 4)
    directionalLight.intensity = 3;
    scene.add(directionalLight)

    const ambientLight = new AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    // Load GLB model
    const container = new Object3D()
    container.position.set(0, 0, 0)

    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
      "/yippie.glb", // Update path to .glb file
      (gltf) => {
        const object = gltf.scene
        object.scale.set(1, 1, 1)
        object.position.set(0, -0.3, 0)
        container.add(object)

        // Animation
        if (gltf.animations.length > 0) {
          const mixer = new AnimationMixer(object);
          mixerRef.current = mixer;
          const action = mixer.clipAction(gltf.animations[0]); // Play first animation
          action.play();
        }

        modelRef.current = object; // Store reference

      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
      },
      (error) => {
        console.log("An error occurred:", error)
      }
    )

    scene.add(container)

    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta(); // Get time since last frame
      if (mixerRef.current) {
        mixerRef.current.update(delta); // Update animation
      }
      renderer.render(scene, camera);
    });
    renderer.setSize(window.innerWidth, window.innerHeight)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", onResize, false)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true;
    
    controls.addEventListener("change", () => {
      console.log(
        `Camera Position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`
      )
    })

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

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
      <div>
        <h1>Avocado mannen hilser!</h1>
      </div>
      <canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          backgroundImage: "linear-gradient(to top, #fff4c2, #fdff94, #fdff94)",
        }}
        ref={canvasRef}
      />
    </>
  )
}
