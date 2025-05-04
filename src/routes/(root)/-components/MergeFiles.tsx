import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'
import { FaEllipsisVertical, FaEye, FaTrashCan } from 'react-icons/fa6'
import { useUploadContext } from '../../../hooks/useUploadContext'
import { UploadedFile } from '../../../@types/upload'
import useLanguage from '../../../hooks/useLanguage'
import { useNavigate } from '@tanstack/react-router'
import useAppContext from '../../../hooks/useAppContext.ts'

const MergeFiles = () => {
  const { uploadedFiles, setUploadedFiles, removeUploadedFile, mergeFiles } = useUploadContext()
  const { getMessage } = useLanguage()
  const { setReloadModalOpen } = useAppContext()
  const navigate = useNavigate({ from: '/' })
  const { preserveWaypoints, setPreserveWaypoints, reloadModalOpen } = useAppContext()

  const reorder = (list: Array<UploadedFile>, startIndex: number, endIndex: number) => {
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

  const removeFile = (file: UploadedFile) => () => {
    removeUploadedFile(file)
  }

  const handleUpload = async () => {
    const redirectPath = await mergeFiles()
    await navigate({ to: redirectPath })
    setReloadModalOpen(false)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {uploadedFiles.map((file, index) => (
                <Draggable key={file.id} index={index} draggableId={file.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex px-2 p-2 my-3 inline-button max-w-[480px]"
                    >
                      <div className="flex flex-row" style={{ width: '100%' }}>
                        <div className="flex-none">
                          <FaEllipsisVertical className="relative top-1" />
                        </div>
                        <div className="grow overflow-hidden text-ellipsis whitespace-nowrap">
                          {file.name}
                        </div>
                        <div className="shrink justify-end">
                          <FaTrashCan
                            className="ml-1 relative top-1 mr-1"
                            onClick={removeFile(file)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div>
        {uploadedFiles.length > 0 && (
          <>
            {reloadModalOpen && (
              <div>
                <input
                  id="preserveWaypoints-checkbox"
                  type="checkbox"
                  onChange={(e) => setPreserveWaypoints(e.target.checked)}
                  checked={preserveWaypoints}
                  value=""
                  className="w-4 h-4"
                />
                <label htmlFor="preserveWaypoints-checkbox" className="ms-2">
                  {getMessage('preserve_waypoints')}
                </label>
              </div>
            )}
            <button
              onClick={handleUpload}
              className="pl-4 p-2 my-3 max-w-[480px] outline-button text-left"
              style={{ width: '100%' }}
            >
              <FaEye className="top-1 text-2xl inline-block mr-2" />
              {uploadedFiles.length == 1 && getMessage('visualize_file')}
              {uploadedFiles.length > 1 && getMessage('visualize_files')}
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default MergeFiles
