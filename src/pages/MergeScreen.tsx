import UploadForm from '../components/merge/UploadForm'
import MergeFiles from '../components/merge/MergeFiles'
import Intro from '../components/merge/Intro'
import { UploadProvider } from '../components/services/providers/upload/UploadProvider'

const MergeScreen = () => (
  <div className="mx-10 mt-8">
    <h1 className="text-6xl text-base-content font-medium tracking-wide">GPS-Tools</h1>
    <UploadProvider>
      <Intro />
      <UploadForm />
      <MergeFiles />
    </UploadProvider>
  </div>
)

export default MergeScreen
