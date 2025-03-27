import { useNavigate, useParams } from 'react-router'
import { CARDS } from '../../constants'
import Add from '../../components/icons/Add'
import ArrowDownLeft from '../../components/icons/ArrowDownLeft'
import './index.scss'

function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const card = CARDS.find((card) => card.id === id)

  return (
    <main id="details">
      <div
        data-id={id}
        className={`card ${card?.bg} rounded-lg flex flex-col items-center`}
        style={{ width: '35ch', height: '45ch', viewTransitionName: `card-${id}` }}
      >
        <button className="col-1!" onClick={() => document.startViewTransition(() => navigate('/'))}>
          <ArrowDownLeft className="w-8 h-8" />
        </button>
        <button className="col-3!">
          <Add className="w-8 h-8 add-icon" />
        </button>
        
        <img src={card?.image} className="logo w-24 h-24" alt="Vite logo" />

        <h1 className="card-title">{card?.name}</h1>
      </div>
    </main>
  )
}

export default Details
