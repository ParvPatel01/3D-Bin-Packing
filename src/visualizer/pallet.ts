import * as THREE from 'three';

export function createPallet(
  w: number,
  h: number,
  d: number,
  scene: THREE.Scene
): void {
  const geometry = new THREE.BoxGeometry(w, 50, d);
  const material = new THREE.MeshBasicMaterial({ color: '#955008' });
  const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const wireframe = new THREE.WireframeGeometry(geometry);

  const cube = new THREE.Mesh(geometry, material);

  const palletWireframeGeometry = new THREE.BoxGeometry(w, h, d);
  const palletWireframe = new THREE.WireframeGeometry(palletWireframeGeometry);
  const palletLine = new THREE.LineSegments(palletWireframe, wireframeMaterial);

  const line = new THREE.LineSegments(wireframe, wireframeMaterial);
  line.material.depthTest = true;
  line.material.opacity = 0.85;
  line.material.transparent = true;

  cube.position.set(w / 2, -25, d / 2);
  line.position.set(w / 2, -25, d / 2);
  palletLine.position.set(w / 2, h / 2, d / 2);

  scene.add(cube, line, palletLine);
}
