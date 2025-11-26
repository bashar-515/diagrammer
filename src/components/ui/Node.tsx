import { NODE_DIAMETER, NODE_RADIUS } from '../../consts';

function Node() {
  return (
    <svg
      display='block'
      width={NODE_DIAMETER}
      height={NODE_DIAMETER}
    >
      <circle cx={NODE_RADIUS} cy={NODE_RADIUS} r={NODE_RADIUS} fill="black" />
    </svg>
  );
}

export default Node
