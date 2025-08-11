import * as THREE from "three";

export function createBox(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    color: string,
    scene: THREE.Scene
): void {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.WireframeGeometry(geometry);
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(z, y, z);

    const line = new THREE.LineSegments(wireframe, lineMaterial);
    line.material.depthTest = true;
    line.material.opacity = 0.85;
    line.material.transparent = true;
    cube.position.set(x + w / 2, y + h / 2, z + d / 2);
    line.position.set(cube.position.x, cube.position.y, cube.position.z);
    scene.add(cube, line)
}