import { useState } from 'react'
import { NODE_RADIUS } from './consts'
import Node from './components/ui/Node'

function App() {
  const [pos, setPos] = useState<{ x: number, y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX - NODE_RADIUS;
    const y = e.clientY - NODE_RADIUS;

    setPos({ x, y });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {pos && (
        <div
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
          }}
        >
          <Node />
        </div>
      )}
    </div>
  )
}

export default App
