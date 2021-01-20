import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export default function Block({
  alignItems,
  justifyContent,
  children,
  container,
  item,
  spacing = 2,
  padding = 0,
  paddingHorizontal = 0,
  paddingVertical = 0,
}) {
  const blockClassName = classnames('block', {
    'block--container': container === true,
    'block--item': item === true,
    [`block--spacing-${spacing}`]: container === true,
    [`block--padding-${padding}`]: container === true && padding !== 0,
    [`block--padding-horizontal-${paddingHorizontal}`]:
      container === true && paddingHorizontal !== 0,
    [`block--padding-vertical-${paddingVertical}`]:
      container === true && paddingVertical !== 0,
    [`block--justify-content-${justifyContent}`]: Boolean(justifyContent),
    [`block--align-items-${alignItems}`]: Boolean(alignItems),
  })
  return <div className={blockClassName}>{children}</div>
}

Block.propTypes = {
  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  padding: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  paddingHorizontal: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  paddingVertical: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  alignItems: PropTypes.oneOf([
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch',
  ]),
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  container: PropTypes.bool,
  item: PropTypes.bool,
  children: PropTypes.node,
}
