import PropTypes from 'prop-types'

type ButtonProps = {
  size: 'xs' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ size, children, ...props }) => (
  <button className={`btn btn-${size}`} {...props}>
    {children}
  </button>
)

Button.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'] as const).isRequired,
  children: PropTypes.node.isRequired,
}

export default Button
