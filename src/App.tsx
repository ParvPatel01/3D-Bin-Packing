import React, { useState } from 'react';
import Visualizer from './components/Visualizer';
import { buildLayerCandidates } from './packing/layers';
import { packPalletWithLayers } from './packing/packing';
import { getPalletOrientations } from './packing/utils';
import { Pallet, PlacedBox } from './packing/type';
import { scene } from './visualizer/scene';
import ControlPanel from './components/ControlPanel';

function App() {
  // Pallet state
  const [pallet, setPallet] = useState<Pallet>({ w: 1200, h: 2200, d: 800 });

  // Boxes state: array of boxes with editable qty
  const [boxes, setBoxes] = useState<PlacedBox[]>([
    { id: "A", w: 500, h: 500, d: 800, qty: 2, x: 0, y: 0, z: 0, orientation: [500, 500, 800], color: "#ff0000" },
    { id: "D", w: 500, h: 50, d: 800, qty: 5, x: 0, y: 0, z: 0, orientation: [500, 50, 800], color: "#00ff00" },
    { id: "E", w: 200, h: 250, d: 200, qty: 2, x: 0, y: 0, z: 0, orientation: [200, 250, 200], color: "#0000ff" },
    { id: "B", w: 1200, h: 500, d: 800, qty: 1, x: 0, y: 0, z: 0, orientation: [1200, 500, 800], color: "#ffff00" }
  ]);

  const [placedBoxes, setPlacedBoxes] = useState<PlacedBox[]>([]);
  const [bestUtil, setBestUtil] = useState(0);

  // Handle pallet dimension changes
  const handlePalletChange = (field: keyof Pallet, value: number) => {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    setPallet(prev => ({ ...prev, [field]: value }));
  };

  // Handle box quantity changes
  const handleQtyChange = (index: number, qty: number) => {
    setBoxes(prev => {
      const updated = [...prev];
      updated[index].qty = qty;
      return updated;
    });
  };

  // Trigger packing on demand
  const handlePack = () => {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    let bestSolution = { utilization: 0, placed: [] as any[] };

    for (const orientation of getPalletOrientations(pallet)) {
      const layers = buildLayerCandidates(boxes, orientation);
      const result = packPalletWithLayers(boxes, orientation, layers);
      if (result.utilization > bestSolution.utilization) {
        bestSolution = { utilization: result.utilization, placed: result.placed };
      }
    }

    setBestUtil(bestSolution.utilization);
    setPlacedBoxes(bestSolution.placed);
  };

  const controlPanelStyle: React.CSSProperties = {
    position: 'absolute',
    width: 300,
    height: '60vh',
    padding: 20,
    background: '#ffffffff',
    margin: 20,
    borderRadius: 15,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', padding: 0, margin: 0 }}>
      {/* Controls panel */}
      <div style={controlPanelStyle}>
        <ControlPanel
          pallet={pallet}
          boxes={boxes}
          handlePalletChange={handlePalletChange}
          handleQtyChange={handleQtyChange}
          handlePack={handlePack}
          bestUtil={bestUtil}
        />
      </div>

      {/* Visualizer */}
      <div style={{ flexGrow: 1, height: '100vh' }}>
        <Visualizer pallet={pallet} placedBoxes={placedBoxes} />
      </div>
    </div>
  );
}

export default App;
