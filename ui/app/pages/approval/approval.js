import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ConfirmationFooter from '../../components/app/confirmation-footer'
import Block from '../../components/ui/block'
import Chip from '../../components/ui/chip'
import MetaMaskTemplateRenderer from '../../components/ui/metamask-template-renderer/metamask-template-renderer'
import SiteIcon from '../../components/ui/site-icon'
import { DEFAULT_ROUTE } from '../../helpers/constants/routes'
import { stripHttpSchemes } from '../../helpers/utils/util'
import { useI18nContext } from '../../hooks/useI18nContext'
import { useOriginMetadata } from '../../hooks/useOriginMetadata'
import { getUnapprovedAddEthereumChainRequests } from '../../selectors'
import { getTemplatedValues } from './templates'

export default function ApprovalPage() {
  const t = useI18nContext()
  const dispatch = useDispatch()
  const history = useHistory()
  const pendingApprovals = useSelector(getUnapprovedAddEthereumChainRequests)
  const [currentPendingApproval, setCurrentPendingApproval] = useState(0)

  useEffect(() => {
    if (pendingApprovals.length === 0) {
      history.push(DEFAULT_ROUTE)
    } else if (pendingApprovals.length <= currentPendingApproval) {
      setCurrentPendingApproval(pendingApprovals.length - 1)
    }
  }, [pendingApprovals, history, currentPendingApproval])

  const pendingApproval = pendingApprovals[currentPendingApproval]
  const templatedValues = useMemo(() => {
    return getTemplatedValues(pendingApproval, t, dispatch)
  }, [pendingApproval, t, dispatch])
  const originMetadata = useOriginMetadata(pendingApproval.origin)
  return (
    <div className="approval-page">
      {pendingApprovals.length > 1 && (
        <div className="approval-page__navigation">
          <p>
            {currentPendingApproval + 1} of {pendingApprovals.length} pending
          </p>
          {currentPendingApproval > 0 && (
            <button
              className="approval-page__navigation-button"
              onClick={() =>
                setCurrentPendingApproval(currentPendingApproval - 1)
              }
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          <button
            className="approval-page__navigation-button"
            disabled={currentPendingApproval + 1 === pendingApprovals.length}
            onClick={() =>
              setCurrentPendingApproval(currentPendingApproval + 1)
            }
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
      <div className="approval-page__content">
        <Block container justifyContent="center" padding={4}>
          <Chip
            label={stripHttpSchemes(originMetadata.origin)}
            labelColor="gray"
            leftIcon={
              <SiteIcon
                icon={originMetadata.icon}
                iconName={originMetadata.name}
                size={32}
              />
            }
          />
        </Block>
        <MetaMaskTemplateRenderer sections={templatedValues.content} />
      </div>
      <ConfirmationFooter
        notice={templatedValues.notice}
        onApprove={templatedValues.onApprove}
        onCancel={templatedValues.onCancel}
        approveText={templatedValues.approvalText}
        cancelText={templatedValues.cancelText}
      />
    </div>
  )
}
