import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { FaTrashCan, FaEllipsisVertical } from 'react-icons/fa6'
import { FiDownload } from 'react-icons/fi'
import { useUploadContext } from '../../context/UploadContext'
import VisualizeTrack from './VisualizeTrack'
import { UploadedFile } from '../../@types/upload'

const MergeFiles = () => {
  const {
    uploadedFiles,
    setUploadedFiles,
    mergedFile,
    setMergedFile,
    removeUploadedFile,
    mergeFiles,
  } = useUploadContext()

  const reorder = (
    list: Array<UploadedFile>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    setUploadedFiles(reorder(uploadedFiles, source.index, destination.index))
  }

  const handleReset = () => {
    setMergedFile(null)
  }

  const removeFile = (file: UploadedFile) => () => {
    removeUploadedFile(file)
  }

  const addThousandsSeparator = (x: number, separator: string) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {uploadedFiles.map((file, index) => (
                <Draggable key={file.id} index={index} draggableId={file.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='flex mb-1 mt-1 bg-slate-700'
                    >
                      <FaEllipsisVertical />
                      {file.filename} -{' '}
                      {addThousandsSeparator(Math.round(file.size / 1024), '.')}
                      kB{' '}
                      <FaTrashCan className='ml-1' onClick={removeFile(file)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className='mt-7'>
        {uploadedFiles.length > 0 && (
          <button className='btn btn-active' onClick={mergeFiles}>
            {uploadedFiles.length == 1 && 'Visualize'}
            {uploadedFiles.length > 1 && 'Merge & Visualize'}
          </button>
        )}
      </div>

      <div>
        {mergedFile !== null && (
          <>
            <div>
              <a href={mergedFile.href + '?m=dl'}>
                <FiDownload className='inline mr-1' />
                {mergedFile.filename}
              </a>
            </div>
            <br />
            <button className='btn btn-active mb-7' onClick={handleReset}>
              Reset
            </button>
            <VisualizeTrack trackId={mergedFile.id} />
          </>
        )}
      </div>
    </>
  )
}

export default MergeFiles
