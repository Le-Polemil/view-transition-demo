import { Link, useViewTransitionState } from 'react-router'
import ThumbsUp from './icons/ThumbsUp'
import Applause from './icons/Applause'
import { useState } from 'react';
import { flushSync } from 'react-dom';

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
  const href = `/${id}`;
  const isTransitioningToThis = useViewTransitionState(href);

  const [isReversed, setIsReversed] = useState(index % 2 === 1)

  function toggleReversed() {
    document.startViewTransition(() => {
      flushSync(() => {
        setIsReversed(prev => !prev);
      })
    })
  }

  return (
    <Link
      style={{ viewTransitionName: `card-${id}`, zIndex: index + 1 }}
      className={['card col-2 rounded-lg flex items-stretch overflow-clip', bg, className, isReversed && 'flex-row-reverse', isTransitioningToThis && 'clicked'].filter(Boolean).join(' ')}
      to={href}
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
      <div className="flex-1 min-h-full overflow-clip" style={{ viewTransitionName: `card-${id}-img` }}>
        <img 
          src={image} 
          className="img object-cover h-full w-full"
          alt={`${name} illustration`}
          draggable="false"
          />
      </div>

      <div className="-mx-3 z-20" style={{ viewTransitionName: `card-${id}-toggle-reversed` }}>
        <button 
          className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleReversed();
          }}
        >
          <svg 
            className="w-6 h-6 text-white transform rotate-90" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M7 16V4M7 4L3 8M7 4L11 8" />
            <path d="M17 8v12M17 20l4-4M17 20l-4-4" />
          </svg>
        </button>
      </div>

      <div 
        className="flex-1 flex flex-col justify-items-center gap-2 w-24"
        style={{ viewTransitionName: `card-${id}-texts` }}
      >
        <div className="flex-1 flex items-center justify-center text-xl p-4">
          <span className="card-title">{name}</span>
        </div>
        <div className="flex justify-between p-4">
          <ThumbsUp className="w-6 h-6 text-white thumbs-up-icon" />
          <Applause className="w-6 h-6 text-white applause-icon" />
        </div>
      </div>

      
    </Link>
  )
}

export default Card;