import { useContext } from 'react'
import UploadedFilesContext from '../../context/UploadedFilesContext'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

function ListUploadedFiles() {
  const { uploadedFiles, setUploadedFiles } = useContext(UploadedFilesContext)

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

  return (
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
                  >
                    {file.filename} - {file.size} bytes{' '}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListUploadedFiles
