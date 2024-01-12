# three-frontend

## 기술 스택 
React, Three.js, Cannon.js, Recoil

### 1. 환경 맵 구현
three.js에서 3D 배경을 구현하기 위해서는 .hdri 파일을 cubemap 형태로 변환해야합니다.<br/>
무료 hdri 다운로드 링크 https://open3dlab.com/project/70/ <br/>
hdri to cubemap 변환 사이트 링크 https://matheowis.github.io/HDRI-to-CubeMap/<br/>

### 2. 플레이어 구현
three.js에서는 gltf와 glb 파일만 업로드 가능합니다.<br/>
따라서 fbx파일이 아닌 gltf 혹은 glb파일을 제작하거나 구해서 애니메이션 데이터를 적용시키고 사용해야 합니다.<br/>
플레이어 및 애니메이션 다운로드 링크 https://www.mixamo.com/#/<br/>
glb 파일에 애니메이션 데이터 적용 링크 https://nilooy.github.io/character-animation-combiner/<br/>

### 3. 기타 3D 파일
glb 파일은 해당 사이트에서 구매하거나 구할 수 있습니다 <br/>
https://kr.3dexport.com/

### 4. 그 외 그래픽스 지식들
render, scene, camera, lighting, shadow, material, geometry, mesh

### 5. 3D 오브젝트 충돌 감지
raycasting
3D오브젝트를 클릭하고 싶을 때, onClick이 아닌 raycasting을 통해 광선을 쏴서 적중되는 오브젝트를 감지하는 방식으로 클릭해야합니다.
https://threejs.org/docs/index.html?q=rayca#api/en/core/Raycaster

### 6. 그 외 밤샘의 원인
1. 마우스 컨트롤
    - 처음에는 각도를 계산해서 마우스를 클릭하고 움직이는 방향을 체크했는데, three.js에는 OrbitControls라는 1인칭 마우스 컨트롤러를 제공합니다
      (대신 마우스로 클릭 및 컨트롤러만 이용하고 플레이어 움직임은 키보드로 전환해야함) -> 이때 마우스 움직임에서 키보드 컨트롤러 움직임으로 변경했습니다.
2. 키보드 컨트롤러
    - 현재 구글링 및 chatGPT에서 알려주는 키보드 컨트롤러 방식은 작동하지 않습니다. 그래서 직접 구현해야 합니다.
      (요청하시면 코드 보내드리겠습니다)
3. 레이캐스팅 중복 문제
    - 제가 집을 클릭할 때, 처음에는 집이랑 땅이 동시에 클릭이 되는 문제가 있었습니다. three.js에서는 레이캐스팅의 우선순위를 지정해주어야 합니다.
  



