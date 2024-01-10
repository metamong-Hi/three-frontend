import {
	AnimationMixer
} from 'three';

export class Player {
	constructor(info) {
		this.moving = false;

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					}
				});
				// this.scene.scale.set(.001*this.scene.scale.x, .001*this.scene.scale.y, .001 * this.scene.scale.z)
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.position.y = 0.3;
				this.modelMesh.name = 'metamong';
				//사이즈 조절 ** 여기 수정함 1/1
				this.modelMesh.scale.set(0.02,0.02,0.02);
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);

				this.actions = [];
		
				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[0]);
				this.actions[1] = this.mixer.clipAction(glb.animations[1]);
				this.actions[0].play();
			}
		);
	}
}
// import * as CANNON from 'cannon';

// import {
// 	AnimationMixer
// } from 'three';

// export class Player {
// 	constructor(info) {
// 		this.moving = false;

// 		info.gltfLoader.load(
// 			info.modelSrc,
// 			glb => {
// 				glb.scene.traverse(child => {
// 					if (child.isMesh) {
// 						child.castShadow = true;
// 					}
// 				});
// 				// this.scene.scale.set(.001*this.scene.scale.x, .001*this.scene.scale.y, .001 * this.scene.scale.z)
// 				this.modelMesh = glb.scene.children[0];
// 				this.modelMesh.position.y = 0.3;
// 				this.modelMesh.name = 'metamong';
// 				//사이즈 조절 ** 여기 수정함 1/1
// 				this.modelMesh.scale.set(0.02,0.02,0.02);
// 				info.scene.add(this.modelMesh);
// 				info.meshes.push(this.modelMesh);

// 				this.actions = [];
				
// 				this.mixer = new AnimationMixer(this.modelMesh);
// 				this.actions[0] = this.mixer.clipAction(glb.animations[0]);
// 				this.actions[1] = this.mixer.clipAction(glb.animations[1]);
// 				this.actions[0].play();
// 				this.createPhysicsBody(info);
// 			}
// 		);
// 	}
// 	createPhysicsBody(info) {
// 		console.log("여기까지 들어옴");
//         // 플레이어의 모델에 맞는 물리 바디 형태 설정
//         // 예: Box 형태 (크기는 메쉬에 맞춰 조정 필요)
//         const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)); // 크기 조정 필요
//         this.body = new CANNON.Body({
//             mass: 1, // 질량 설정
//             shape: shape
//         });

//         // 플레이어의 초기 위치 설정
//         this.body.position.set(
//             this.modelMesh.position.x,
//             this.modelMesh.position.y,
//             this.modelMesh.position.z
//         );

//         // 물리 세계에 바디 추가
//         info.world.addBody(this.body);
//     }
// 	updatePhysics() {
//         if (this.modelMesh && this.body) {
//             // 물리 바디의 위치와 회전을 메쉬와 동기화
//             this.modelMesh.position.copy(this.body.position);
           
//         }
//     }
// }
