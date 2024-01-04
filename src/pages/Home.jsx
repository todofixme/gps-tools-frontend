import React from 'react'
import UploadForm from '../components/upload/UploadForm'
import ListUploadedFiles from '../components/upload/ListUploadedFiles'

function Home() {
  return (
    <div>
      <h1 className='text-6xl'>GPX-Merge</h1>
      <UploadForm />
      <ListUploadedFiles />
    </div>
  )
}

export default Home
