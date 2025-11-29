import { DOT_DIAMETER, DOT_RADIUS } from '../../consts';

function Dot({ selected }: { selected: boolean }) {
  return (
    <svg
      display='block'
      width={DOT_DIAMETER}
      height={DOT_DIAMETER}
    >
      <circle
        cx={DOT_RADIUS}
        cy={DOT_RADIUS}
        r={DOT_RADIUS}
        fill={selected ? 'red' : 'black'}
      />
    </svg>
  );
}

export default Dot
