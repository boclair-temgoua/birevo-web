import { useEffect } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { OneVoucherResponse } from '../core/_moduls'

interface Props {
  setOpenModal: any,
  voucherItem: OneVoucherResponse
}

export const VoucherShowModal: React.FC<Props> = ({ setOpenModal, voucherItem }) => {

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
        <div className='modal-dialog modal-dialog-centered mw-1000px modal-dialog-scrollable'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <div
                onClick={() => { setOpenModal(false) }}
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            {/* <UserEditModalHeader /> */}
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
            <p>{voucherItem?.code}</p>
              {/* <UserEditModalFormWrapper /> */}
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={() => { setOpenModal(false) }}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
            {/* end::Modal body */}
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
