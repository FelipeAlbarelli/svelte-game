<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { AutoColliders,   BasicPlayerController, RigidBody, type CollisionGroupsBitMask } from '@threlte/rapier'
  import { BoxGeometry, CapsuleGeometry, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector3 } from 'three'
    import { globalPointer, globalStore } from '../global';
	import { Align, Text3DGeometry } from '@threlte/extras';
	import { changeMsg, commandStore } from '../ui-dashboard/commandStore';
	import type { ThreeJSEvent } from '../models';
	import { cameraControls } from './camera.control';
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { spring } from 'svelte/motion';
	import Plane from './Plane.svelte';
	import CameraFirstPerson from './CameraFirstPerson.svelte';


  export let initX = 0
  export let initZ = 0

  export let playerMesh: Mesh
  let lookAtMesh: Mesh
  let lookFromMesh: Mesh

  export let collGround : CollisionGroupsBitMask = [15] ;
  export let collObjs : CollisionGroupsBitMask = [0] ;
    const {  camera  } = useThrelte()
  


  let pointer2D : Vector2
  let point3D : Vector3

  let cameraMovVector = new Vector2()

    $: text = `${pointer2D.x.toFixed(3)} ${pointer2D.y.toFixed(3)}`
    $: text2 = `${pointer2D.x.toFixed(3)} ${pointer2D.y.toFixed(3)}`

    $:{
        changeMsg({text})
    }
  globalStore.subscribe( (state) => {
    pointer2D = state.pointer2D
    point3D = state.point3D
  })

  export const minHorCamSens = 0.15 
  export const minVerCamSens = 0.05 
  export const horTurnSpeed = 90 
  export const verTurnSpeed = 45 

  const calcCamRot = (x: number , minSens : number) => {
    const abs = Math.abs(x)
    if (abs < minHorCamSens) {
      return 0
    }
    const numFactor = x > 0 ? 1 : -1;
    return DEG2RAD * numFactor * (abs - minSens)
  }

  let pressedW = false;
  let pressedS = false;
  let pressedA = false;
  let pressedD = false;

  let posx = spring(initX)
  let posz = spring(initZ)

  const onKey = (e: KeyboardEvent , up: boolean) => {
    const key = e.key;
    switch (key) {
      case 'w':
        pressedW = up
        // facingDir.set(up ? 1 : 0)
        break;
      case 's':
        pressedS = up
        // facingDir.set(up ? -1 : 0)
        break;
      case 'a':
        pressedA = up
        break;
      case 'd':
        pressedD = up
      default:
        break;
    }
  }

  const calcMov = () => {
    const fb = Number(pressedW) - Number(pressedS)
    const lr = Number(pressedA) - Number(pressedD)
    return {fb , lr}
  }

  const camPos = new Vector3()
  const camTarget = new Vector3()
  const camDir = new Vector3()
  let playerPos = new Vector3()

  let moveToPos = new Vector3()
  let lookAtPos = new Vector3()

  const speed = 10;


  const moveToX = spring(0)
  const moveToZ = spring(0)

  useTask( delta => {

    $cameraControls?.getPosition(camPos)
    playerPos = playerMesh.getWorldPosition(playerPos)

    lookAtMesh.getWorldPosition(lookAtPos)
    $cameraControls?.getTarget(camTarget)
    $camera.getWorldDirection(camDir)


    // $cameraControls?.lookInDirectionOf(...lookAtPos.toArray())

    lookFromMesh.getWorldPosition(moveToPos)

    moveToX.set(moveToPos.x)
    moveToZ.set(moveToPos.z)

    $cameraControls?.rotate(
      -delta * horTurnSpeed * calcCamRot(pointer2D.x, minHorCamSens) , 
       delta * verTurnSpeed * calcCamRot(pointer2D.y , minVerCamSens)  , 
      false
    )


    changeMsg({ 
      moveToX : `${moveToPos.x.toFixed(2)}` ,
      moveToZ : `${moveToPos.z.toFixed(2)}` ,
      lookAtX : `${lookAtPos.x.toFixed(2)}` ,
      lookAtZ : `${lookAtPos.z.toFixed(2)}` ,
      camX : `${camDir.x.toFixed(2)}` ,
      camY : `${camDir.x.toFixed(2)}` ,
    })
    $cameraControls?.setTarget(  lookAtPos.x , 3 , lookAtPos.z);
    
    
    if(pressedW && !pressedS) {
      posx.update( prev => prev + (camDir.x * speed * delta))
      posz.update( prev => prev + (camDir.z * speed *delta ))
    }

    // if ( camPos.distanceTo(moveToPos) > 1 ) {
      // $cameraControls?.moveTo(...moveToPos.toArray() ,  true)
    // }


  })

</script>

<!-- sky -->


<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<svelte:body 
  on:keydown={(e) => onKey(e , true)} 
  on:keyup={(e) => onKey(e , false)} 
  
  ></svelte:body>
  <T.Mesh
    bind:ref={playerMesh}
    position={[$posx , 3 , $posz]}
  >
    <!-- target -->
    <T.Mesh
      position.x={0}
      position.z={1}
      bind:ref={lookAtMesh}
      
      position.y={0}
      geometry={new BoxGeometry( 0.2 ,0.2, 0.2)}
      material={new MeshStandardMaterial({transparent: true , opacity: 0.5 , color : 'blue'})}
    />
    <T.Mesh
      position.x={0}
      position.y={0}
      position.z={-1}
      bind:ref={lookFromMesh}
      geometry={new BoxGeometry( 0.2 ,0.2, 0.2)}
      material={new MeshStandardMaterial({transparent: true , opacity: 0.5 , color : 'green'})}
    />


  <T.Mesh
    receiveShadow
    geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
      material={new MeshStandardMaterial({transparent: true , opacity: 0.1 , color : 'white'})}
  >
    <slot />
    <T.Mesh
    position.x={.5}
    position.z={0}
    position.y={0}
    receiveShadow
    castShadow
    geometry={new BoxGeometry( 1 ,0.2, 1)}
    material={new MeshStandardMaterial()}
    />
  </T.Mesh>

  </T.Mesh>

<CameraFirstPerson
      fov={50}
      zoom={1}
      positionX={$moveToX}
      positionY={0}
      positionZ={$moveToZ}
      controlerMesh={lookFromMesh}
/>