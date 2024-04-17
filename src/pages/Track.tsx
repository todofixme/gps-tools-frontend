import { useParams } from 'react-router-dom'
import VisualizeTrack from '../components/merge/VisualizeTrack.tsx'

const Track = () => {
  const { id } = useParams()

  return (
    <div>
      <h1 className='text-6xl'>GPS-Tool</h1>
      {id !== undefined && <VisualizeTrack trackId={id} />}
    </div>
  )
}

export default Track
