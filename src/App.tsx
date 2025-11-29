import { useState, useRef } from 'react'
import { DOT_RADIUS } from './consts'
import Dot from './components/ui/Dot'

type Node = { x: number, y: number };
type DragState = { id: number, offsetX: number, offsetY: number };

function App() {
  const [nodes, setNodes] = useState<Record<number, Node>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const dragMovedRef = useRef(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedId === null) {
      const x = e.clientX - DOT_RADIUS;
      const y = e.clientY - DOT_RADIUS;

      setNodes(prev => ({
        ...prev,
        [Date.now()]: { x, y },
      }));
    }

    setSelectedId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId !== null) {
      setNodes(prev => {
        const next = { ...prev };
        delete next[selectedId];
        return next;
      });

      setSelectedId(null);
    } else if (e.key === 'Escape' && selectedId !== null) {
      setSelectedId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState) return;

    const { id, offsetX, offsetY } = dragState;

    setNodes(prev => {
      const next = { ...prev };

      if (next[id]) {
        next[id] = {
          ...next[id],
          x: e.clientX - offsetX,
          y: e.clientY - offsetY,
        };
      }

      return next;
    });

    dragMovedRef.current = true;
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
      {Object.entries(nodes).map(([idStr, node]) => {
        const id = Number(idStr)

        return (<div
          key={id}
          onClick={(e) => {
            e.stopPropagation();

            if (dragMovedRef.current) {
              dragMovedRef.current = false;

              return;
            }

            if (selectedId === null) {
              setSelectedId(id);
            } else {
              setSelectedId(null);
            }
          }}
          onMouseDown={(e) => {
            e.stopPropagation();

            dragMovedRef.current = false;

            setDragState({
              id: id,
              offsetX: e.clientX - node.x,
              offsetY: e.clientY - node.y,
            })
          }}
          style={{
            position: 'absolute',
            left: node.x,
            top: node.y,
          }}
        >
          <Dot selected={id === selectedId} />
        </div>)
      })} 
    </div>
  )
}

export default App
