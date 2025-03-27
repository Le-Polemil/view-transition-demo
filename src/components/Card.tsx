import { Link } from 'react-router'
import Add from './icons/Add'

type CardProps = {
  id: string;
  name: string;
  image: string;
  bg: string;
  onDragStart: () => void;
  onDragEnd: () => void;
  index: number;
  className?: string;
}

function Card({ id, name, image, bg, onDragStart, onDragEnd, index, className }: CardProps) {
  return (
    <Link
      style={{ viewTransitionName: `card-${id}`, zIndex: index + 1 }}
      className={['card col-2 rounded-lg flex flex-col items-center', bg, className].filter(Boolean).join(' ')}
      to={`/${id}`}
      viewTransition
      draggable="true"
      onDragStart={(ev) => {
        onDragStart();
        // This enables the dragging functionality on iOS too.
        // See this great tweet by Adam Argyle: https://twitter.com/argyleink/status/1687160975374626816
        ev.dataTransfer.setData("text/html", ev.currentTarget.outerHTML);
      }}
      onDragEnd={onDragEnd}
      // onClick={handleClick}
    >
      <img 
        src={image} 
        className="logo mx-6 my-6 w-20 h-20" 
        alt={`${name} logo`}
        draggable="false"
      />

      <div 
        className="flex items-center justify-between gap-2 w-full"
      >
        <span className="card-title">{name}</span>
        <Add className="w-6 h-6 add-icon" />
      </div>
    </Link>
  )
}

export default Card;