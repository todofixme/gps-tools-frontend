import useLanguage from '../../hooks/useLanguage'
import { useUploadContext } from '../../hooks/useUploadContext'

const Intro = () => {
  const { mergedFile } = useUploadContext()
  const { getMessage } = useLanguage()

  return (
    <>
      {mergedFile === null && (
        <div>
          {getMessage('intro_header')}
          <ul className='list-disc pl-5'>
            {(getMessage('intro_description_list') as Array<string>).map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default Intro
