import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import { FaCircleInfo, FaEllipsisVertical, FaTrashCan } from 'react-icons/fa6'
import { useUploadContext } from '../../context/UploadContext'
import VisualizeTrack from './VisualizeTrack'
import { UploadedFile } from '../../@types/upload'
import DownloadLink from './DownloadLink'
import { GeoJsonObject } from 'geojson'

const MergeFiles = () => {
  const {
    uploadedFiles,
    setUploadedFiles,
    mergedFile,
    setMergedFile,
    removeUploadedFile,
    mergeFiles,
  } = useUploadContext()

  const [trackname, setTrackname] = useState<string>('')
  const [optimizeWaypoints, setOptimizeWaypoints] = useState<boolean>(false)
  const [geoJson, setGeoJson] = useState<GeoJsonObject | null>(null)

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
                      <FaEllipsisVertical className='relative top-1' />
                      {file.filename} -{' '}
                      {addThousandsSeparator(Math.round(file.size / 1024), '.')}
                      kB{' '}
                      <FaTrashCan
                        className='ml-1 relative top-1'
                        onClick={removeFile(file)}
                      />
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
            <div className='flex flex-row'>
              <div>
                <DownloadLink
                  type='gpx'
                  trackname={trackname}
                  optimizeWaypoints={optimizeWaypoints}
                  geoJson={geoJson}
                />
                <br />
                <DownloadLink
                  type='tcx'
                  trackname={trackname}
                  optimizeWaypoints={optimizeWaypoints}
                  geoJson={geoJson}
                />
              </div>
              <div className='flex items-center ml-6'>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  onChange={(e) => setOptimizeWaypoints(e.target.checked)}
                  value=''
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='default-checkbox' className='ms-2'>
                  Optimize Waypoints
                </label>
                &nbsp;
                <div
                  className='tooltip'
                  data-tip='Waypoints that are closer than 500m to the track will be moved to a point on the track. This can improve readability on some GPS-devices, since these are having problems with points located not directly on the track.'
                >
                  <FaCircleInfo className='' />
                </div>
              </div>
            </div>
            <br />
            <button className='btn btn-active mb-7' onClick={handleReset}>
              Reset
            </button>
            <VisualizeTrack
              trackId={mergedFile.id}
              setTrackname={setTrackname}
              setGeoJson={setGeoJson}
            />
          </>
        )}
      </div>
    </>
  )
}

export default MergeFiles
