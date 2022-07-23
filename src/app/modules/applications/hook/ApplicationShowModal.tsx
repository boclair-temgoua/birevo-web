import { KTSVG } from '../../../../_metronic/helpers'
import { OneApplicationResponse, OneApplicationTokenResponse } from '../core/_moduls';
import { getTokenWithApplications } from '../api';
import { useQuery } from '@tanstack/react-query';
import { ApplicationTokenTable } from './ApplicationTokenTable';

interface Props {
  setOpenModal: any,
  applicationItem?: OneApplicationResponse | any
}

export const ApplicationShowModal: React.FC<Props> = ({ setOpenModal, applicationItem }) => {


  const fetchTokensApplication = async () => await getTokenWithApplications({ applicationId: applicationItem?.id })
  const {
    isLoading,
    isError,
    error,
    data,
    isPreviousData,
  } = useQuery(['tokenApplications'], () => fetchTokensApplication(), {
    staleTime: 5000
  })

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><>Error: {error}</></tr>) :
      (data?.data?.count <= 0) ? (<></>) :
        (
          data?.data?.map((item: OneApplicationTokenResponse, index: number) => (
            <ApplicationTokenTable item={item} key={index} />
          )))
  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
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
                  <h1 className="mb-3">Copied keys</h1>
                  <div className="text-muted fw-bold fs-5">If you need more info, please check
                    <a href="#" className="link-primary fw-bolder"> documentation</a>.
                  </div>
                </div>
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
  )
}
