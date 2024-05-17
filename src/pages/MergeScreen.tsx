import UploadForm from '../components/merge/UploadForm'
import MergeFiles from '../components/merge/MergeFiles'
import Intro from '../components/merge/Intro'
import { UploadProvider } from '../components/services/providers/upload/UploadProvider'

const MergeScreen = () => (
  <div>
    <h1 className="text-6xl">GPS-Tools</h1>
    <UploadProvider>
      <Intro />
      <UploadForm />
      <MergeFiles />
    </UploadProvider>
  </div>
)

export default MergeScreen
