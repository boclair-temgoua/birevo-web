import {
  SHOW_SUBSCRIBE,
  GET_USER_NAV_SUBSCRIBE,
  GET_ORGANIZATIONS_USER_SUBSCRIBES,
} from './rootAction'
// import { getContributorsPaginateSubscribes, getOne } from '../../views/subscribes/api';

// import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import {getOrganizationsUserSubscribe} from '../../modules/subscribes/api'

// { type: 'increase-counter' }), []
export const loadShowSubscribe =
  (options: {userId: number; subscribableId: number}) => async (dispatch: any) => {
    const {userId, subscribableId} = {...options}
    // await getOne({ userId, subscribableId })
    //     .then((response) =>
    //         dispatch({
    //             type: SHOW_SUBSCRIBE,
    //             payload: response.data,
    //         }),
    //     )
    //     .catch((error) => console.error(error));
  }

export const loadOrganizationsUserSubscribes =
  (options: {filterQuery?: string; limit: number; page: number}) => async (dispatch: any) => {
    const {filterQuery, limit, page} = options
    await getOrganizationsUserSubscribe({filterQuery, limit, page})
      .then((response) =>
        dispatch({
          type: GET_ORGANIZATIONS_USER_SUBSCRIBES,
          payload: response.data,
        })
      )
      .catch((error) => console.error('Error ---->', error.message))
  }

export const loadUserNavContributorsSubscribes =
  (options: {is_paginate: boolean; limit: number; page: number}) => async (dispatch: any) => {
    const {is_paginate, limit, page} = {...options}
    // await getContributorsPaginateSubscribes({
    //     is_paginate,
    //     limit,
    //     page,
    // })
    //     .then((response) =>
    //         dispatch({
    //             type: GET_USER_NAV_SUBSCRIBE,
    //             payload: response.data,
    //         }),
    //     )
    //     .catch((error) => console.log('Error ---->', error.message));
  }
