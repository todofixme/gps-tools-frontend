import { FaArrowRight } from 'react-icons/fa6'
import useLanguage from '../../hooks/useLanguage'
import { useUploadContext } from '../../hooks/useUploadContext'

const Intro = () => {
  const { mergedFile } = useUploadContext()
  const { getMessage } = useLanguage()

  return (
    <>
      {mergedFile === null && (
        <div className="text-base-content mt-4 font-normal text-lg">
          <div className="font-medium" id="introHeader">
            {getMessage('intro_header')}
          </div>
          <ul className="list-none list-inside">
            {(getMessage('intro_description_list') as Array<string>).map((item, index) => (
              <li key={index}>
                <FaArrowRight
                  className="highlight-color inline text- mr-1"
                  style={{ verticalAlign: '-2px' }}
                />{' '}
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Intro
