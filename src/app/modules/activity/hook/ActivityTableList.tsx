import { OneActivityResponse } from '../core/_moduls';
import { formateDateDayjs } from '../../../utility/commons/formate-date-dayjs';


type Props = {
  item: OneActivityResponse;
}

const ActivityTableList: React.FC<Props> = ({ item }) => {

  return (
    <>
      <tr key={item?.id}>
        <td className='text-dark fw-bolder text-hover-primary'>
          {item?.ipLocation}
        </td>
        <td className='text-dark fw-bolder text-hover-primary'>
          {item?.activityAbleType}
        </td>
        <td className='text-dark fw-bolder text-hover-primary'>
          {item?.action}
        </td>
        <td className='text-dark fw-bolder text-hover-primary'>
          {item?.browser}
        </td>
        <td className='text-dark fw-bolder text-hover-primary'>
          {item?.platform}
        </td>
        <td className='text-dark fw-bolder text-hover-primary'>
          {formateDateDayjs(item?.createdAt)}
        </td>
        {/* <td className='text-dark fw-bolder text-hover-primary'>
          {item?.source}
        </td> */}
      </tr>
    </>
  )
}

export { ActivityTableList }
