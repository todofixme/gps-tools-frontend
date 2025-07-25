import { FaEllipsis, FaEye, FaEyeSlash, FaPenToSquare } from 'react-icons/fa6'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import React, { useMemo, useRef } from 'react'
import { sanitizeFilename } from '../../../utils/tools'
import useLanguage from '../../../hooks/useLanguage'
import ReloadButton from './ReloadButton.tsx'
import DownloadButton from './DownloadButton.tsx'

type TrackHeaderProps = {
  trackname: string
  setTrackname: React.Dispatch<React.SetStateAction<string>>
  showPolyline: boolean
  setShowPolyline: React.Dispatch<React.SetStateAction<boolean>>
}

const TrackHeader: React.FC<TrackHeaderProps> = ({
  trackname,
  setTrackname,
  showPolyline,
  setShowPolyline,
}) => {
  const tracknameInputFieldRef = useRef<HTMLElement>(null as unknown as HTMLElement)
  const tracknameRef = useRef('')
  const { getMessage } = useLanguage()

  useMemo(() => {
    tracknameRef.current = trackname
  }, [trackname])

  const handleChange = (evt: ContentEditableEvent) => {
    tracknameRef.current = evt.currentTarget.innerHTML
  }

  const handleBlur = () => {
    const sanitized = sanitizeFilename(tracknameRef.current)
    tracknameRef.current = sanitized
    setTrackname(sanitized)
  }

  return (
    <div className="flex flex-row ml-5 text-base-content mr-4">
      <div className="mb-4">
        <div className="text-">Trackname</div>
        <div className="flex text-2xl">
          <ContentEditable
            id="editTrackname"
            html={tracknameRef.current}
            onChange={handleChange}
            onBlur={handleBlur}
            innerRef={tracknameInputFieldRef}
          />
          &nbsp;
          <FaPenToSquare
            className="hidden sm:flex mx-0 relative top-[2px] highlight-color"
            onClick={() => {
              tracknameInputFieldRef?.current?.focus()
            }}
          />
        </div>
      </div>
      <div
        className="mx-5 mb-2 tooltip top-6 hidden md:flex"
        data-tip={getMessage('tooltip_mute') as string}
      >
        {showPolyline ? (
          <FaEye className="text-3xl" onClick={() => setShowPolyline(false)} />
        ) : (
          <FaEyeSlash className="text-3xl" onClick={() => setShowPolyline(true)} />
        )}
      </div>
      <div className="flex flex-1 justify-end md:hidden mr-8">
        <FaEllipsis className="ms-2 relative top-[15px] text-xl" />
      </div>
      <div className="hidden md:flex flex-1 mb-4 justify-end items-center">
        <div className="flex flex-row flex-1 justify-end items-center">
          <ReloadButton />
          <DownloadButton />
        </div>
      </div>
    </div>
  )
}

export default TrackHeader
