import UploadForm from '../components/merge/UploadForm'
import MergeFiles from '../components/merge/MergeFiles'
import { UploadProvider } from '../context/UploadContext'

function Merge() {
  return (
    <div>
      <h1 className='text-6xl'>GPX-Merge</h1>
      <UploadProvider>
        <UploadForm />
        <MergeFiles />
      </UploadProvider>
    </div>
  )
}

export default Merge
