/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTSVG } from '../../../../_metronic/helpers'
import { OneSubscribeResponse } from '../../subscribes/core/_models';
import { capitalizeOneFirstLetter } from '../../../utility/commons/capitalize-first-letter';
import { OneActivityResponse } from '../../activity/core/_moduls';
import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';


type Props = {
  activityItem?: OneActivityResponse;
}

const ActivityUserTableList: React.FC<Props> = ({ activityItem }) => {

  return (
    <tr key={activityItem?.id}>
      <td>
        <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {activityItem?.action}
        </a>
      </td>
      <td>
        <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {activityItem?.ipLocation}
        </a>
      </td>
      <td>
        <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {activityItem?.countryCode}
        </a>
      </td>
      <td>
        <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {activityItem?.city}
        </a>
      </td>
      <td>
        <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {formateDateDayjs(activityItem?.createdAt)}
        </a>
      </td>
    </tr>
  )
}

export { ActivityUserTableList }
