import {GET_CURRENCIES} from './rootAction'
import {getCurrencies} from '../../modules/currency/api/index'

export const loadAllCurrencies = () => async (dispatch: any) => {
  try {
    const {data} = await getCurrencies()
    return dispatch({
      type: GET_CURRENCIES,
      payload: data,
    })
  } catch (error) {
    throw error
  }
  // await userApi
  //     .getOne({ user_uuid })
  //     .then((response) =>
  //         dispatch({
  //             type: GET_CURRENCIES,
  //             payload: response.data,
  //         }),
  //     )
  //     .catch((error) => console.error(error));
}
