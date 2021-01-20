import React from 'react'
import InfoIconInverted from '../icon/info-icon-inverted.component'

export default function Callout({ severity, children }) {
  return (
    <div className="callout">
      <InfoIconInverted severity={severity} />
      <div className="callout__content">{children}</div>
    </div>
  )
}
