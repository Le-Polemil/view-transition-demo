import { CARDS } from '../../constants'
import { Fragment, useState } from 'react'
import { flushSync } from 'react-dom'
import DropArea from '../../components/DropArea'
import Card from '../../components/Card'
import './index.scss'

function App() {
  const [mainColumn, setMainColumn] = useState(CARDS.map(({ id }) => id))
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null)
  const [trashColumn, setTrashColumn] = useState<string[]>([])

  const draggingCardIndexInMainColumn = mainColumn.findIndex(id => id === draggingCardId)
  const draggingCardIndexInTrashColumn = trashColumn.findIndex(id => id === draggingCardId)

  function onDrop(index: number, inTrash: boolean = false) {
    if (!draggingCardId) return;

    const mainColumnWithoutDraggedCard = mainColumn.filter(id => id !== draggingCardId)
    const trashColumnWithoutDraggedCard = trashColumn.filter(id => id !== draggingCardId)
    
    let newMainColumn = [...mainColumnWithoutDraggedCard]
    let newTrashColumn = [...trashColumnWithoutDraggedCard]
    let newIndex = index;

    if (inTrash) {
      newIndex = trashColumnWithoutDraggedCard.length // get the destination index after removing the card
      newTrashColumn = [...trashColumnWithoutDraggedCard, draggingCardId]
    } else { 
      newIndex = mainColumnWithoutDraggedCard.findIndex(id => id === mainColumn[index]) ?? mainColumnWithoutDraggedCard.length // get the destination index after removing the card
      // @ts-expect-error toSpliced is new in es2023
      newMainColumn = mainColumnWithoutDraggedCard.toSpliced(newIndex, 0, draggingCardId)
    }
    
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setMainColumn(newMainColumn);
          setTrashColumn(newTrashColumn);
        });
      });
      // If view transitions aren't supported (e.g. mobile safari), we just update the state.
    } else {
      setMainColumn(newMainColumn);
      setTrashColumn(newTrashColumn);
    }
  };

  return (
    <main id="list" className="relative">
      <DropArea
        onDrop={() => onDrop(0)} 
        alwaysDisplay={mainColumn.length <= 0}
        active={draggingCardIndexInMainColumn > 0 || draggingCardIndexInTrashColumn >= 0}
      />

      {mainColumn.map((id, index) => {
        const { name, image, bg } = CARDS.find(({ id: cardId }) => cardId === id)!

        return (
          <Fragment key={id}>
            <Card
              id={id}
              className={id === "dubstep" ? "clicked" : undefined}
              index={index}
              name={name}
              image={image}
              bg={bg}
              onDragStart={() => setDraggingCardId(id)}
              onDragEnd={() => setDraggingCardId(null)}
            />

            <DropArea 
              onDrop={() => onDrop(index + 1)} 
              active={(
                (draggingCardIndexInMainColumn >= 0 && 
                ![draggingCardIndexInMainColumn, draggingCardIndexInMainColumn - 1].includes(index))
                || draggingCardIndexInTrashColumn >= 0
              )} 
            />
          </Fragment>
        )
      })}

      <div className="away-column sticky bottom-8 right-0 self-end z-10">
        <DropArea 
          className="mb-2"
          onDrop={() => onDrop(0, true)}  
          active={draggingCardIndexInTrashColumn > 0 || draggingCardIndexInMainColumn >= 0} 
        >
          <div className="flex items-center gap-2 justify-center text-gray-400">
            Poubelle
            <svg 
              className="w-6 h-6" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>
        </DropArea>
        

        <div className="flex">
          {trashColumn.map((id, index) => {
            const { name, image, bg } = CARDS.find(({ id: cardId }) => cardId === id)!

            return (
              <div key={id} className={["flex-1", index < trashColumn.length -1 && "-mr-[70%]"].filter(Boolean).join(" ")} style={{ "marginTop": `calc(${index} * 2rem)` }}>
                <Card 
                  id={id}
                  index={index}
                  name={name} 
                  image={image} 
                  bg={bg} 
                  onDragStart={() => setDraggingCardId(id)} 
                  onDragEnd={() => setDraggingCardId(null)} 
                />
              </div>
            )
          })}
        </div>
        
      </div> 
    </main>
  )
}

export default App
