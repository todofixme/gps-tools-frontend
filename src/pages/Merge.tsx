import UploadForm from '../components/merge/UploadForm'
import MergeFiles from '../components/merge/MergeFiles'
import Intro from '../components/merge/Intro'
import { UploadProvider } from '../context/UploadContext'

const Merge = () => (
  <div>
    <h1 className='text-6xl'>GPS-Tool</h1>
    <UploadProvider>
      <Intro />
      <UploadForm />
      <MergeFiles />
    </UploadProvider>
  </div>
)

export default Merge
