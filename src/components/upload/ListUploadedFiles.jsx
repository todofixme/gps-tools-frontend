import { useContext, useState } from 'react'
import UploadedFilesContext from '../../context/UploadedFilesContext'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { FaTrashCan, FaEllipsisVertical } from 'react-icons/fa6'

function ListUploadedFiles() {
  const {
    uploadedFiles,
    setUploadedFiles,
    mergedFile,
    setMergedFile,
    removeUploadedFile,
    mergeFiles,
  } = useContext(UploadedFilesContext)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return
    setUploadedFiles(reorder(uploadedFiles, source.index, destination.index))
  }

  const handleReset = () => {
    setMergedFile(null)
  }

  const removeFile = (file) => () => {
    removeUploadedFile(file)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {uploadedFiles.map((file, index) => (
                <Draggable key={file.id} index={index} draggableId={file.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='flex mb-1 mt-1'
                    >
                      <FaEllipsisVertical />
                      {file.filename} - {file.size} bytes{' '}
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

      <div>
        {uploadedFiles.length > 0 && (
          <button className='btn btn-active' onClick={mergeFiles}>
            Merge
          </button>
        )}
      </div>

      <div>
        {mergedFile !== null && (
          <>
            <a href={mergedFile.href}>{mergedFile.filename}</a>
            <br />
            <button className='btn btn-active' onClick={handleReset}>
              Reset
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default ListUploadedFiles
