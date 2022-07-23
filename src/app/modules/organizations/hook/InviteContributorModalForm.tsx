import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../../../utility/commons/useDebounce";
import { OneOrganizationResponse } from '../core/_models';
import { getUsers } from '../../user/api/index';
import { SubscribeModalUserTable } from './SubscribeModalUserTable';
import { KTSVG } from "../../../../_metronic/helpers";

interface Props {
    setOpenModal?: any,
    organization?: OneOrganizationResponse
}

export const InviteContributorModalForm: React.FC<Props> = ({ setOpenModal, organization }) => {
    const [filter, setFilter] = useState<string>('')

    const debouncedFilter = useDebounce(filter, 1000);
    const isEnabled = Boolean(debouncedFilter)
    const fetchUserOrg = async (debouncedFilter: string) => await getUsers({
        filterQuery: debouncedFilter,
        limit: 10,
        page: 1
    })

    const {
        status,
        isError,
        error,
        data,
    } = useQuery(['users', debouncedFilter], () => fetchUserOrg(debouncedFilter), {
        enabled: !!isEnabled,
        staleTime: 5000
    })

    const dataTable = status === 'loading' ? (<strong>Loading...</strong>) :
        isError ? (<>Error: {error}</>) :
            (data?.data?.data?.length <= 0) ? ('') :
                (
                    data?.data?.data?.map((item: any, index: number) => (
                        <SubscribeModalUserTable organization={organization} subscribe={item} key={index} />
                    )))
    return (
        <>

            <div
                className='modal fade show d-block'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-750px modal-dialog-scrollable'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <div className="modal-header pb-0 border-0 justify-content-end">
                            <div onClick={() => { setOpenModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                                <KTSVG
                                    path="/media/icons/duotune/arrows/arr061.svg"
                                    className="svg-icon svg-icon-2x"
                                />
                            </div>
                        </div>
                        <div className="modal-body scroll-y pt-0 pb-15">
                            <div className="mw-lg-600px mx-auto">
                                <div className="mb-13 text-center">
                                    <h1 className="mb-3">Invite a Collaborator in {organization?.name}</h1>
                                    <div className="text-muted fw-bold fs-5">If you need more info, please check out
                                        <a href="#" className="link-primary fw-bolder">&nbsp;FAQ Page</a>.
                                    </div>
                                </div>

                                <input
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="form-control form-control-solid mb-8"
                                    placeholder="Type or paste emails here" />
                                {dataTable}
                            </div>
                        </div>

                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show'></div>
            {/* end::Modal Backdrop */}

        </>


    );
};