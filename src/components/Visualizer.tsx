import React, { useRef, useEffect } from 'react';
import { Pallet, PlacedBox } from '../packing/type';
import { scene } from '../visualizer/scene';
import { createPallet } from '../visualizer/pallet';
import { createBox } from '../visualizer/box';
import { renderer } from '../visualizer/renderer';
import { camera } from '../visualizer/camera';
import { controls } from '../visualizer/controls';

interface VisualizerProps {
  pallet: Pallet;
  placedBoxes: PlacedBox[]; // Boxes must have x,y,z coords for position
}

const Visualizer: React.FC<VisualizerProps> = ({ pallet, placedBoxes }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;


    // Create the pallet and boxes
    createPallet(pallet.w, pallet.h, pallet.d, scene);
    placedBoxes.forEach(box => {
      createBox(
        box.orientation[0], box.orientation[1], box.orientation[2],
        box.x, box.y, box.z,
        box.color,
        scene
      );
    });

    // Update controls target
    controls.target.set(pallet.w / 2, pallet.h / 2, pallet.d / 2);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Append renderer to mountRef
    mountRef.current?.appendChild(renderer.domElement);
  }, [pallet, placedBoxes]);

  return <div ref={mountRef} />;
};

export default Visualizer;