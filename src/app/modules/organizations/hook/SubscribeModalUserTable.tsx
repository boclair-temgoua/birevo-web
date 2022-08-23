import { useState } from "react";
import { capitalizeFirstLetter } from "../../../utility/commons/capitalize-first-letter";
// import { OneOrganizationResponse } from "../../organizations/types";
// import { OneContributorSubscribeResponse } from "../types";
// import { crateOneContributor } from "../api";
import { OneOrganizationResponse, ContributorCreateMutation } from '../core/_models';
import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
import { crateOneContributor } from '../../subscribes/api/index';
import { KTSVG } from "../../../../_metronic/helpers";
import { OneUserResponse } from '../../user/core/_models';

interface Props {
  user: OneUserResponse
  organization?: OneOrganizationResponse,
}

export const SubscribeModalUserTable: React.FC<Props> = ({ user, organization }) => {
  const [isInvited, setIsInvited] = useState<boolean>(true)


  const actionDeleteMutation = ContributorCreateMutation({ onSuccess: () => {} });

  const invitedItem = async (user: OneUserResponse) => {
    const payloadSave = { contributorId: Number(user?.profile?.userId) }
    actionDeleteMutation.mutateAsync(payloadSave)
    setIsInvited(isInvited => !isInvited)
  }

  const lastNameItem = String(user?.profile?.lastName)
  const firstNameItem = String(user?.profile?.firstName)
  return (
    <>
      <div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
        <div className="d-flex align-subscribeProjects-center">
          <div className="symbol symbol-35px symbol-circle">
            {user?.profile?.image ? (<img alt={`${lastNameItem} ${firstNameItem}`} src={user?.profile?.image} />) :
              (<span className={`symbol-label bg-light-${user?.profile?.color} text-${user?.profile?.color} fw-bold`}>
                {capitalizeFirstLetter(firstNameItem, lastNameItem)}</span>)}
          </div>
          <div className="ms-5">
            <a href={void (0)} className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">{firstNameItem} {lastNameItem}</a>
            <div className="fw-bold text-muted">{user?.email}</div>
          </div>
        </div>
        <div className="ms-2 w-100px">
          <button onClick={() => invitedItem(user)} className={`btn btn-sm btn-light btn-active-${isInvited ? 'primary' : 'success'}`}>
            <KTSVG path={`/media/icons/duotune/${isInvited ? 'arrows/arr075' : 'arrows/arr012'}.svg`} className='svg-icon-3' />{isInvited ? 'Invite' : 'Invited'}
          </button>
        </div>
      </div>
    </>
  )
}
