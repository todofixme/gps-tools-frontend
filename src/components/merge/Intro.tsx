import { useUploadContext } from '../../hooks/useUploadContext.ts'

const Intro = () => {
  const { mergedFile } = useUploadContext()

  return (
    <>
      {mergedFile === null && (
        <div>
          This app allows you to:
          <ul className='list-disc pl-5'>
            <li>Upload a single or multiple files in GPX- or FIT-format.</li>
            <li>Merge them into a single file.</li>
            <li>Visualize the merged file.</li>
            <li>Add, change and remove waypoints.</li>
            <li>Download the merged file as GPX or TCX.</li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Intro
