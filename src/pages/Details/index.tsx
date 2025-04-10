import { Link, useParams } from 'react-router'
import { CARDS } from '../../constants'
import ArrowDownLeft from '../../components/icons/ArrowDownLeft'
import './index.scss'
import ThumbsUp from '../../components/icons/ThumbsUp'
import Applause from '../../components/icons/Applause'
import Add from '../../components/icons/Add'
import { useState } from 'react'
import { flushSync } from 'react-dom'

const STEPS = [
  {
    icon: ThumbsUp,
    position: "col-3! row-3"
  },
  {
    icon: Add,
    position: "col-1! row-1"
  },
  {
    icon: Applause,
    position: "col-3! row-1"
  },
]

function Details() {
  const { id } = useParams()
  const card = CARDS.find((card) => card.id === id)
  const [stepId, setStepId] = useState(0)
  const StepIcon = STEPS[stepId].icon
  const stepPosition = STEPS[stepId].position

  function goNextStep() {
    document.startViewTransition(() => {
      flushSync(() => {
        setStepId((stepId + 1) % STEPS.length)
      })
    })
  }

  return (
    <main id="details">
      <div
        data-id={id}
        className={[`card rounded-lg items-center relative w-[35ch] h-[45ch] overflow-clip`, card?.bg].filter(Boolean).join(' ')}
        style={{ viewTransitionName: `card-${id}` }}
      >
        <div className="ignore-col-padding row-[1/-1] h-full w-full z-0">
          <img src={card?.image} className="h-full w-full img" alt="Illustration" />
        </div>

        {/* @ts-expect-error to accept -1 as a goback button */}
        <Link to={-1} viewTransition className="col-1! row-3! z-10 arrow-icon">
          <ArrowDownLeft className="w-8 h-8" />
        </Link>

        <button className={["step-icon z-10", stepPosition].filter(Boolean).join(' ')} onClick={goNextStep}>
          <StepIcon className={["w-8 h-8", stepId === 0 && 'thumbs-up-icon'].filter(Boolean).join(' ')} />
        </button>
        
        <h1 className="card-title row-2 z-10">{card?.name}</h1>
      </div>
    </main>
  )
}

export default Details
