import { OneActivityResponse } from '../core/_moduls';
import dayjs from 'dayjs';


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
          {dayjs(item?.createdAt).format('DD/MM/YYYY')}
        </td>
        <td className='text-dark fw-bolder text-hover-primary'>
          {item?.source}
        </td>
      </tr>
    </>
  )
}

export { ActivityTableList }
