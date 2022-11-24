import { Link } from 'react-router-dom';
import { KTSVG } from '../../../../_metronic/helpers';
import { getOneByIdOrganizationApi } from '../api/index';
import { useQuery } from '@tanstack/react-query';


type Props = {
  userItem: any;
}


const OrganizationNavActivityList: React.FC<Props> = ({ userItem }) => {
  const fetchOneUser = async () => await getOneByIdOrganizationApi({ organization_uuid: userItem?.auth?.organizationId })
  const { data } = useQuery(['organization'], () => fetchOneUser(), {
    refetchOnWindowFocus: false
  })
  const organization: any = data?.data

  const billingAmount: number = organization?.billing?.total;
  return (
    <>
      <div className="row g-5 g-xl-8">

        <div className="col-xl-12">
          <div className="card h-150px card-xl-stretch">
            <div className="card-body d-flex align-items-center justify-content-between flex-wrap">
              <div className="me-2">
                <h1 className="fw-bold text-gray-800 mb-3">{organization?.name || process.env.REACT_APP_NAME}</h1>
                <div className="text-muted fw-semibold fs-6">Generate the voucher and coupon for company projects</div>
              </div>
              <Link to="/vouchers/coupons" className="btn btn-sm btn-flex btn-primary fw-bolder me-3">
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />Start Now
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-3">
          <Link to="/vouchers/coupons" className="card bg-body-white hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <div className="card-title d-flex flex-column">
                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{organization?.couponTotal || '0'}</span>
                <span className="text-gray-400 pt-1 fw-semibold fs-6">Coupons</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-3">
          <Link to="/vouchers/vouchers" className="card bg-body-white hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <div className="card-title d-flex flex-column">
                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{organization?.voucherTotal || '0'}</span>
                <span className="text-gray-400 pt-1 fw-semibold fs-6">Vouchers</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-3">
          <Link to="/organizations/contributors" className="card bg-body-white hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <div className="card-title d-flex flex-column">
                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{organization?.contributorTotal || '0'}</span>
                <span className="text-gray-400 pt-1 fw-semibold fs-6">Contributors</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-3">
          <Link to="/account/billing" className="card bg-body-white hoverable card-xl-stretch mb-xl-8">
            <div className="card-body">
              <div className="card-title d-flex flex-column">
                <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
                  {billingAmount > 0 && '+'} {Number(((Math.abs(billingAmount)) * (userItem?.currency?.amount)) || '0.00').toFixed(2).toLocaleString()} {userItem?.currency?.code}
                </span>
                <span className="text-gray-400 pt-1 fw-semibold fs-6">Estimated period</span>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </>
  )
}

export { OrganizationNavActivityList }
