import { Pallet, PlacedBox } from "../packing/type";

interface ControlPanelProps {
  pallet: Pallet;
  boxes: PlacedBox[];
  handlePalletChange: (field: keyof Pallet, value: number) => void;
  handleQtyChange: (index: number, qty: number) => void;
  handlePack: () => void;
  bestUtil: number;
}

const ControlPanel = ({
  pallet,
  boxes,
  handlePalletChange,
  handleQtyChange,
  handlePack,
  bestUtil
}: ControlPanelProps) => {
  return (
    <div style={{ width: '100%', height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>Pallet Dimensions</h2>
      {(['w', 'h', 'd'] as (keyof Pallet)[]).map((dim) => (
        <div key={dim}>
          <label>{dim.toUpperCase()}:</label>
          <input style={{ width: 100, marginLeft: 5 }}
            type="number"
            value={pallet[dim]}
            onChange={(e) => handlePalletChange(dim, parseInt(e.target.value, 10) || 0)}
            min={1}
            max={5000}
          />
        </div>
      ))}

      <h2>Boxes</h2>
      {boxes.map((box, idx) => (
        <div key={box.id} style={{ marginBottom: 10 }}>
          <strong>{box.id}</strong> (WxHxD: {box.w}x{box.h}x{box.d})
          <br />
          Qty:
          <input
            type="number"
            min={0}
            value={box.qty}
            onChange={(e) => handleQtyChange(idx, parseInt(e.target.value, 10) || 0)}
            style={{ width: 60, marginLeft: 5 }}
          />
        </div>
      ))}

      <button onClick={handlePack} style={{ marginTop: 20, padding: '8px 16px' }}>
        Pack Pallet
      </button>

      <p>
        Utilization: {(bestUtil * 100).toFixed(2)}%
      </p>
    </div>
  );
};


export default ControlPanel;