import {getOneApi} from '../../modules/user/api'
import {SHOW_USER} from './rootAction'

export const loadShowUser = (options: {user_uuid: string}) => async (dispatch: any) => {
  const {user_uuid} = {...options}
  await getOneApi({user_uuid})
    .then((response) =>
      dispatch({
        type: SHOW_USER,
        payload: response.data,
      })
    )
    .catch((error) => console.error(error))
}
