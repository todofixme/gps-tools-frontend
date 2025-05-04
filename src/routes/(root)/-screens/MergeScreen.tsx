import UploadForm from '../-components/UploadForm'
import MergeFiles from '../-components/MergeFiles'
import Intro from '../-components/Intro'
import { UploadProvider } from '../../../services/providers/upload/UploadProvider'
import GpsToolsGraphic from '../-components/GpsToolsGraphic'

const MergeScreen = () => (
  <>
    <div className="ml-2 md:ml-6 lg:ml-10 mt-8 flex flex-row">
      <div className="flex-1 w-100%">
        <h1 className="text-6xl text-base-content font-medium tracking-wide">GPS-Tools</h1>
        <UploadProvider>
          <Intro />
          <UploadForm />
          <MergeFiles />
        </UploadProvider>
      </div>
      <div
        className="mx-10 mt-10 invisible 2xl:visible xl:visible relative"
        style={{ width: '100%', maxWidth: '1024px' }}
      >
        <GpsToolsGraphic />
      </div>
    </div>
    <p className="mt-10">&nbsp;</p>
  </>
)

export default MergeScreen
