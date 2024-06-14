import React from 'react'

type IconProps = {
  className?: string | undefined
}

const DeIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      id="Deutsche Sprache"
      aria-label="Deutsche Sprache"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 53 53"
      className={className}
    >
      <defs>
        <style>
          {
            '.german-red{fill:#f30040;}.german-red,.german-black,german-gold,.german-outline{stroke-width:0px;}.german-black{fill:#020202;}.german-gold{fill:#fd0;}.german-outline{fill: #fff;}'
          }
        </style>
      </defs>
      <g id="b">
        <g id="c">
          <g>
            <path
              className="german-black"
              d="M51.15,16.76H1.85C5.72,6.94,15.3,0,26.5,0s20.78,6.94,24.65,16.76Z"
            />
            <path
              className="german-red"
              d="M53,26.5c0,3.44-.65,6.73-1.85,9.74H1.85c-1.2-3.01-1.85-6.3-1.85-9.74s.65-6.73,1.85-9.74h49.3c1.2,3.01,1.85,6.3,1.85,9.74Z"
            />
            <path
              className="german-gold"
              d="M51.15,36.24c-3.87,9.82-13.45,16.76-24.65,16.76S5.72,46.06,1.85,36.24h49.3Z"
            />
          </g>
        </g>
      </g>
      <path
        className="german-outline"
        d="M26.5,4c12.41,0,22.5,10.09,22.5,22.5s-10.09,22.5-22.5,22.5S4,38.91,4,26.5,14.09,4,26.5,4M26.5,0C11.86,0,0,11.86,0,26.5s11.86,26.5,26.5,26.5,26.5-11.86,26.5-26.5S41.14,0,26.5,0h0Z"
      />
    </svg>
  )
}

export default DeIcon
