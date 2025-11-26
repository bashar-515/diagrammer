import { useState } from 'react'
import { NODE_RADIUS } from './consts'
import Node from './components/ui/Node'

function App() {
  const [poses, setPoses] = useState<{ x: number, y: number }[] | []>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX - NODE_RADIUS;
    const y = e.clientY - NODE_RADIUS;

    setPoses(prev => [...prev, { x, y }]);
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
      {poses.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
          }}
        >
          <Node />
        </div>
      ))} 
    </div>
  )
}

export default App
