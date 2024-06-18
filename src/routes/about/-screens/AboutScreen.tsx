import { useBackendVersion } from '../../../services/backend/gps-backend-api'
import useLanguage from '../../../hooks/useLanguage'
import { FaArrowRight, FaGithub, FaStrava } from 'react-icons/fa6'
import { SiKomoot } from 'react-icons/si'
import ErtIcon from '../../../icons/ErtIcon'

const NO_VERSION = { app: 'N/A', git: 'N/A' }

const AboutScreen = () => {
  const { getMessage } = useLanguage()
  const { data: backendVersion, isLoading, isError } = useBackendVersion()

  return (
    <div className="ml-2 md:ml-6 lg:ml-10 mt-8 text-base-content">
      <h1 className="text-6xl font-medium tracking-wide">GPS-Tools</h1>
      <p className="mb-4 text-2xl font-light">{getMessage('app_description')}</p>
      <p className="text-lg flex items-center space-x-2">
        <a
          href="https://github.com/devshred/gps-tools-frontend"
          className="hover:underline flex items-center"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="hover:highlight-color" />
          &nbsp;Frontend Version
        </a>
        :{' '}
        <a
          href="https://github.com/devshred/gps-tools-frontend/releases"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {import.meta.env.PACKAGE_VERSION}
        </a>
      </p>
      <p className="text-lg flex items-center space-x-2">
        <a
          href="https://github.com/devshred/gps-tools-backend"
          className="hover:underline flex items-center"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="hover:highlight-color" />
          &nbsp;Backend Version
        </a>
        :{' '}
        <a
          id="backendVersion"
          href="https://github.com/devshred/gps-tools-backend/releases"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {isLoading || isError ? NO_VERSION.app : backendVersion?.app}
        </a>
      </p>
      <p className="text-lg mt-4">{getMessage('technologies_header')}</p>
      <ul className="text-lg mt-4 list-none list-inside">
        <li>
          <FaArrowRight
            className="highlight-color inline text- mr-1"
            style={{ verticalAlign: '-2px' }}
          />{' '}
          <a href="https://react.dev/" className="hover:underline" target="_blank" rel="noreferrer">
            React
          </a>
          ,{' '}
          <a
            href="https://tailwindcss.com/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind CSS
          </a>
          ,{' '}
          <a
            href="https://daisyui.com/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            daisyUI
          </a>
        </li>
        <li>
          <FaArrowRight
            className="highlight-color inline text- mr-1"
            style={{ verticalAlign: '-2px' }}
          />{' '}
          <a href="https://tanstack.com/" className="hover:underline" target="_blank" rel="noreferrer">
            TanStack
          </a>{' '}
          <a
            href="https://tanstack.com/router/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Router
          </a>{' '}
          /{' '}
          <a
            href="https://tanstack.com/query/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Query
          </a>
        </li>
        <li>
          <FaArrowRight
            className="highlight-color inline text- mr-1"
            style={{ verticalAlign: '-2px' }}
          />{' '}
          <a
            href="https://kotlinlang.org/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Kotlin
          </a>
          ,{' '}
          <a href="https://spring.io/" className="hover:underline" target="_blank" rel="noreferrer">
            Spring
          </a>
        </li>
        <li>
          <FaArrowRight
            className="highlight-color inline text- mr-1"
            style={{ verticalAlign: '-2px' }}
          />{' '}
          <a
            href="https://leafletjs.com/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Leaflet
          </a>
          ,{' '}
          <a
            href="https://photon.komoot.io/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            photon
          </a>
        </li>
        <li>
          <FaArrowRight
            className="highlight-color inline text- mr-1"
            style={{ verticalAlign: '-2px' }}
          />{' '}
          <a
            href="https://swagger.io/specification/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            OpenAPI
          </a>
          ,{' '}
          <a
            href="https://geojson.org/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            GeoJSON
          </a>
        </li>
      </ul>
      <p className="text-lg mt-4">{getMessage('contact')}: gps minus tools ät tigerflanke dot de</p>
      <p className="text-lg mt-4 flex items-center space-x-2">
        {getMessage('prefix_social_icons')}
        <a
          href="https://www.strava.com/athletes/2768818"
          className="hover:highlight-color ml-1"
          style={{ width: '100%', maxWidth: '25px' }}
          target="_blank"
          rel="noreferrer"
          aria-label="Link to Strava Provile"
        >
          <FaStrava className="text-2xl hover:highlight-color" />
        </a>
        <a
          href="https://www.komoot.com/de-de/user/53317617542"
          target="_blank"
          rel="noreferrer"
          aria-label="Link to Komoot Profile"
        >
          <SiKomoot title="Komoot Logo" className="text-2xl hover:highlight-color mr-1" />
        </a>
        <a
          href="https://www.europaradtour.de/"
          target="_blank"
          rel="noreferrer"
          style={{ width: '100%', maxWidth: '25px' }}
          aria-label="Link to website of WfF EuropaRadtour"
        >
          <ErtIcon />
        </a>
      </p>
      <p className="mt-10">&nbsp;</p>
    </div>
  )
}

export default AboutScreen
