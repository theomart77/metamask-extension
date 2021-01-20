import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Button from '../../ui/button'
import Callout from '../../ui/callout'

export default function ConfirmationFooter({
  onApprove,
  onCancel,
  approveText,
  cancelText,
  notice,
}) {
  const className = classnames(
    'confirmation-footer',
    notice && `confirmation-footer--${notice.severity}`,
  )
  return (
    <div className={className}>
      {notice && <Callout severity={notice.severity}>{notice.content}</Callout>}

      <div className="confirmation-footer__actions">
        <Button rounded type="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button rounded type="primary" onClick={onApprove}>
          {approveText}
        </Button>
      </div>
    </div>
  )
}

ConfirmationFooter.propTypes = {
  notice: PropTypes.shape({
    severity: PropTypes.oneOf(['warning', 'error', 'info']),
    content: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
  }),
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  approveText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
}
