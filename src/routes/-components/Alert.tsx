import { ReactNode } from 'react'
import PropTypes from 'prop-types'

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode
  status?: 'info' | 'success' | 'warning' | 'error' | undefined
  children: React.ReactNode
}

const Alert: React.FC<AlertProps> = ({ icon, status, className, children, ...props }) => {
  const combinedClassName = ['alert']
  if (status) combinedClassName.push(`alert-${status}`)
  if (className) combinedClassName.push(className)

  return (
    <div role="alert" className={combinedClassName.join(' ')} {...props}>
      {icon}
      {children}
    </div>
  )
}

Alert.propTypes = {
  icon: PropTypes.node.isRequired,
  status: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Alert
