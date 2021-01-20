import { console } from 'globalthis/implementation'
import React from 'react'
import { safeComponentList } from './safe-component-list'

export default function MetaMaskTemplateRenderer({ sections }) {
  if (!sections) {
    return null
  }
  if (typeof sections === 'string') {
    return sections
  }
  return (
    <>
      {sections.reduce((acc, child, index) => {
        console.log(child, typeof child)
        if (typeof child === 'string') {
          acc.push(child)
        } else if (child) {
          const { element, children, props } = child
          const Element = safeComponentList[element] ?? element
          const childrenOrNull = children ? (
            <MetaMaskTemplateRenderer sections={children} />
          ) : null
          acc.push(
            <Element key={`${element}${index + 0}`} {...props}>
              {childrenOrNull}
            </Element>,
          )
        }
        return acc
      }, [])}
    </>
  )
}
