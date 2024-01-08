import React from 'react'
import UploadForm from '../components/merge/UploadForm'
import MergeFiles from '../components/merge/MergeFiles'

function Merge() {
  return (
    <div>
      <h1 className='text-6xl'>GPX-Merge</h1>
      <UploadForm />
      <MergeFiles />
    </div>
  )
}

export default Merge
