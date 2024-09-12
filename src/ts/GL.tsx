import { GradientTexture, Grid, OrbitControls, useFBX } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useState } from "react";
import { MathUtils } from "three/src/math/MathUtils.js";


interface glProps {
    eventSource?: any;
}

function CameraController() {
    const { camera } = useThree();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    // Event handler to update mouse position
    const handleMouseMove = (event:MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
  
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    useFrame(() => {
      camera.position.x += (mousePosition.x * 5 - camera.position.x) * 0.005;
      
      const newYPosition = camera.position.y + (mousePosition.y * 5 - camera.position.y) * 0.005;
      camera.position.y = MathUtils.clamp(newYPosition, 1, 2);
      camera.lookAt(0, 0, 0);
    });
  
    return null;
  }

  
const GL = (props: glProps) => {
    return (
        <div className="canvas__wrapper">
            <Canvas
                camera={{ position: [0, 1.5, 30], fov: 75 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                eventSource={props.eventSource}
                eventPrefix="client"
            >
            <mesh rotation={[-Math.PI/2,0,0]}>
                <planeGeometry args={[200,200,200]}/>
                <meshStandardMaterial color={"#ffffff"}/>
            <OrbitControls />
            <CameraController/>
            </mesh>
            <GradientTexture
                    stops={[0, 1]}
                    colors={["#ffffff", "#fefefe"]}
                    attach="background"
                    size={1024}
                />
                <ambientLight intensity={1.5} color="#ffffff"/>
                <Grid 
                args={[100,100]}
                position={[0,0.1,0]}
                sectionColor={"#f3f3f3"} 
                cellColor={"#111111"}/>
                <directionalLight intensity={5.5} color={"#f0e6cb"} />
            </Canvas>
        </div>
    );
};

const WebGL = forwardRef<any, glProps>((props, ref) => (
    <GL eventSource={props.eventSource}></GL>
));
WebGL.displayName = "WebGL";

export default WebGL;
