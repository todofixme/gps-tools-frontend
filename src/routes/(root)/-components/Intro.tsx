import { FaArrowRight } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import { useUploadContext } from '../../../hooks/useUploadContext'

const Intro = () => {
  const { mergedFile } = useUploadContext()
  const { t } = useTranslation('merge')

  const descriptions = t('description', { returnObjects: true }) as Record<string, string>

  return (
    <>
      {mergedFile === null && (
        <div className="text-base-content mt-4 font-normal text-lg">
          <div className="font-medium" id="introHeader">
            {t('header')}
          </div>
          <ul className="list-none list-inside">
            {Object.entries(descriptions).map(([key, value]) => (
              <li key={key}>
                <FaArrowRight
                  className="highlight-color inline text- mr-1"
                  style={{ verticalAlign: '-2px' }}
                />{' '}
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Intro
