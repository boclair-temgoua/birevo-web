import { useState } from "react";
import { capitalizeFirstLetter } from "../../../utility/commons/capitalize-first-letter";
// import { OneOrganizationResponse } from "../../organizations/types";
// import { OneContributorSubscribeResponse } from "../types";
// import { crateOneContributor } from "../api";
import { OneOrganizationResponse, ContributorCreateMutation } from '../core/_models';
import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
import { crateOneContributor } from '../../subscribes/api/index';
import { KTSVG } from "../../../../_metronic/helpers";

interface Props {
  subscribe: OneContributorSubscribeResponse
  organization?: OneOrganizationResponse,
}

export const SubscribeModalUserTable: React.FC<Props> = ({ subscribe, organization }) => {
  const [isInvited, setIsInvited] = useState<boolean>(true)


  const actionDeleteMutation = ContributorCreateMutation({ onSuccess: () => {} });

  const invitedItem = async (subscribe: OneContributorSubscribeResponse) => {
    const payloadSave = { contributorId: Number(subscribe?.profile?.userId) }
    actionDeleteMutation.mutateAsync(payloadSave)
    setIsInvited(isInvited => !isInvited)
  }

  const lastNameItem = String(subscribe?.profile?.lastName)
  const firstNameItem = String(subscribe?.profile?.firstName)
  return (
    <>
      <div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
        <div className="d-flex align-subscribeProjects-center">
          <div className="symbol symbol-35px symbol-circle">
            {subscribe?.profile?.image ? (<img alt={`${lastNameItem} ${firstNameItem}`} src={subscribe?.profile?.image} />) :
              (<span className={`symbol-label bg-light-${subscribe?.profile?.color} text-${subscribe?.profile?.color} fw-bold`}>
                {capitalizeFirstLetter(firstNameItem, lastNameItem)}</span>)}
          </div>
          <div className="ms-5">
            <a href={void (0)} className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">{firstNameItem} {lastNameItem}</a>
            <div className="fw-bold text-muted">{subscribe?.profile?.email}</div>
          </div>
        </div>
        <div className="ms-2 w-100px">
          <button onClick={() => invitedItem(subscribe)} className={`btn btn-sm btn-light btn-active-${isInvited ? 'primary' : 'success'}`}>
            <KTSVG path={`/media/icons/duotune/${isInvited ? 'arrows/arr075' : 'arrows/arr012'}.svg`} className='svg-icon-3' />{isInvited ? 'Invite' : 'Invited'}
          </button>
        </div>
      </div>
    </>
  )
}
