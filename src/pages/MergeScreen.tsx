import UploadForm from '../components/merge/UploadForm'
import MergeFiles from '../components/merge/MergeFiles'
import Intro from '../components/merge/Intro'
import { UploadProvider } from '../components/services/providers/upload/UploadProvider'
import GpsToolsGraphic from '../components/merge/GpsToolsGraphic'

const MergeScreen = () => (
  <div className="mx-10 mt-8 flex flex-row">
    <div className="flex-1">
      <h1 className="text-6xl text-base-content font-medium tracking-wide">GPS-Tools</h1>
      <UploadProvider>
        <Intro />
        <UploadForm />
        <MergeFiles />
      </UploadProvider>
    </div>
    <div
      className="ml-10 mt-10 invisible 2xl:visible xl:visible relative"
      style={{ width: '100%', maxWidth: '1024px' }}
    >
      <GpsToolsGraphic />
    </div>
  </div>
)

export default MergeScreen
