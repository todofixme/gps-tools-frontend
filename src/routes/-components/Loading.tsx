import PropTypes from 'prop-types'

type LoadingProps = {
  size: 'xs' | 'sm' | 'md' | 'lg'
}

const Loading: React.FC<LoadingProps> = ({ size }) => (
  <span className={`loading loading-spinner loading-${size}`}></span>
)

Loading.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'] as const).isRequired,
}

export default Loading
