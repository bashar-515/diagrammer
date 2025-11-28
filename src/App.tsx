import { useState } from 'react'
import { NODE_RADIUS } from './consts'
import Node from './components/ui/Node'

type Pose = { id: number, x: number, y: number };
type DragState = { id: number, offsetX: number, offsetY: number };

function App() {
  const [poses, setPoses] = useState<Pose[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedId === null) {
      const x = e.clientX - NODE_RADIUS;
      const y = e.clientY - NODE_RADIUS;

      const newPose: Pose = {
        id: Date.now(),
        x,
        y,
      };

      setPoses(prev => [...prev, newPose]);
    }

    setSelectedId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId !== null) {
      setPoses(prev => prev.filter(p => p.id !== selectedId));
      setSelectedId(null);
    } else if (e.key === 'Escape' && selectedId !== null) {
      setSelectedId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState) return;

    setPoses(prev => prev.map(p => p.id === dragState.id ? { ...p, x: e.clientX - dragState.offsetX, y: e.clientY - dragState.offsetY } : p));
  };

  const handleMouseUp = () => {
    setDragState(null);
  }

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {poses.map((p) => (
        <div
          key={p.id}
          onClick={(e) => {
            e.stopPropagation();

            if (p.id === selectedId) {
              setSelectedId(null);
            } else {
              setSelectedId(p.id);
            }
          }}
          onMouseDown={(e) => {
            e.stopPropagation();

            setDragState({
              id: p.id,
              offsetX: e.clientX - p.x,
              offsetY: e.clientY - p.y,
            })
          }}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
          }}
        >
          <Node selected={p.id === selectedId} />
        </div>
      ))} 
    </div>
  )
}

export default App
