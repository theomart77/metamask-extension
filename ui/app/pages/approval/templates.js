import React from 'react'
import { ethErrors } from 'eth-json-rpc-errors'
import {
  rejectPendingApproval,
  resolvePendingApproval,
} from '../../store/actions'
import { COLORS, TYPOGRAPHY } from '../../helpers/constants/design-system'
import { MESSAGE_TYPE } from '../../../../shared/constants/app'

const APPROVAL_TEMPLATES = {
  [MESSAGE_TYPE.ADD_ETHEREUM_CHAIN]: (pendingApproval, t, dispatch) => ({
    content: [
      {
        element: 'Typography',
        children: t('allowCustomNetwork', [
          pendingApproval.requestData?.chainName ?? '',
        ]),
        props: {
          variant: TYPOGRAPHY.H3,
          align: 'center',
          fontWeight: 'bold',
          spacing: 3,
        },
      },
      {
        element: 'Typography',
        children: [
          {
            element: 'span',
            children:
              'Only add chains from sites that you trust. All MetaMask functionality may not work with custom networks. ',
          },
          { element: 'a', children: 'Learn more', props: { href: '#' } },
        ],
        props: {
          variant: TYPOGRAPHY.H6,
          align: 'center',
          color: COLORS.UI4,
        },
      },
      {
        element: 'Block',
        props: {
          container: true,
          padding: 6,
          justifyContent: 'center',
        },
        children: [
          {
            element: 'Chip',
            props: {
              borderColor: COLORS.UI2,
              label: `Chain ID: ${pendingApproval.requestData.chainId}`,
              labelProps: {
                color: COLORS.UI4,
                fontWeight: 'bold',
              },
            },
          },
        ],
      },
    ],
    approvalText: t('approve'),
    cancelText: t('cancel'),
    onApprove: () =>
      dispatch(
        resolvePendingApproval(pendingApproval.id, pendingApproval.requestData),
      ),
    onCancel: () =>
      dispatch(
        rejectPendingApproval(
          pendingApproval.id,
          ethErrors.provider.userRejectedRequest(),
        ),
      ),
    notice: {
      severity: 'warning',
      content: (
        <span>
          This custom network is not an <a href="#">verified custom network</a>.
          Only add custom networks you trust
        </span>
      ),
    },
  }),
}

export function getTemplatedValues(pendingApproval, t, dispatch) {
  const template = APPROVAL_TEMPLATES[pendingApproval.type]
  if (!template) {
    throw new Error(
      `MESSAGE_TYPE: '${pendingApproval.type}' is not specified in approval templates`,
    )
  }
  return template(pendingApproval, t, dispatch)
}
