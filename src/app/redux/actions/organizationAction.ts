import {
  SHOW_ORGANIZATION,
  DELETE_ORGANIZATION_FILE,
  GET_USER_NAV_ORGANIZATION_SUBSCRIBE_FILES,
} from './rootAction'
// import organizationApi from '../../views/organizations/api';
// import subscribeFilesApi from '../../views/subscribe-projects/api';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
// import {getOneOrganizationApi} from '../../modules/organizations/api'

// export const loadShowOrganization =
//   (options: {organization_uuid: string}) => async (dispatch: any) => {
//     const {organization_uuid} = {...options}
//     await getOneOrganizationApi({organization_uuid})
//       .then((response) =>
//         dispatch({
//           type: SHOW_ORGANIZATION,
//           payload: response.data,
//         })
//       )
//       .catch((error) => console.error(error))
//   }

// export const loadUserNavOrganizationSubscribeFiles =
//     (options: {
//         is_paginate: boolean;
//         organization_slug: string;
//         type: string;
//         limit: number;
//         page: number;
//     }) =>
//     async (dispatch: any) => {
//         const { is_paginate, organization_slug, type, limit, page } = { ...options };
//         await organizationApi
//             .getNotPaginateNavContributorsSubscribeProjects(is_paginate, organization_slug, type, limit, page)
//             .then((response) =>
//                 dispatch({
//                     type: GET_USER_NAV_ORGANIZATION_SUBSCRIBE_FILES,
//                     payload: response.data,
//                 }),
//             )
//             .catch((error) => console.log('Error ---->', error.message));
//     };
