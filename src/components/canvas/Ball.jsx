import React,{useRef} from 'react'
import { Suspense } from 'react'
import { Canvas ,useFrame} from '@react-three/fiber'
import {
  Decal , Float , OrbitControls, Preload,useTexture
} from '@react-three/drei';
import CanvasLoader from '../Loader'

const Ball = (props) => {
  const[decal] = useTexture([props.imgUrl]);


  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
  <ambientLight intensity={0.5}/>
  <directionalLight position={[0,5,5]} intensity={1.6}/>
  <mesh castShadow receiveShadow scale={2.75}>
    <icosahedronGeometry args={[1,1]}/>
    <meshStandardMaterial
      metalness={0.2}
      color={'#ffffff'}
      polygonOffset
      polygonOffsetFactor={-5}
      flatShading/>
    <Decal
      position={[0,0,1]}
      rotation={[2*Math.PI,0,6.25]}
      flatShading
      map={decal}/>
  </mesh>
</Float>

  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
    frameloop='always'
    gl={{preserveDrawingBuffer:true}}
    >
      <Suspense fallback = {<CanvasLoader/>}>
        <OrbitControls 
        
        enableZoom = {false}/>
        <Ball imgUrl = {icon}/>

      </Suspense>
      <Preload all/>

    </Canvas>
  )
}

export default BallCanvas