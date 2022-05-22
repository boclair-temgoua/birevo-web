import { FC } from 'react'
import { HelmetSite } from '../../../utility/commons/helmet-site'
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router-dom';
// import { OrganizationSubscribeTable } from '../hook/OrganizationSubscribeTable';
import { CouponCreateForm } from '../hook/CouponCreateForm';

const CouponCreateOrUpdate: FC = () => {
  const userItem = useAuth();
  const navigate = useNavigate();


  return (
    <>
      <HelmetSite title={`Create coupon - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder fs-3 mb-1'>Coupons - {userItem?.organization?.name}</span>
          </h3>

          <div className="d-flex align-items-center py-1">
            {/* <div className="me-4">
              <button type='button'
                onClick={() => { navigate('/vouchers/coupons') }}
                className="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder">Cancel</button>
            </div> */}
            <button type='button'
              onClick={() => { navigate('/vouchers/coupons') }}
              className="btn btn-sm btn-flex btn-light btn-active-primary fw-bolder">Cancel</button>
          </div>
        </div>

        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>

          <CouponCreateForm />

        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export { CouponCreateOrUpdate }
