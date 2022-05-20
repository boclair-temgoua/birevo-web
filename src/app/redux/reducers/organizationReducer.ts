import produce from 'immer'

const initialState: any = {
  organization: [],
  organizations: [],
  userNavOrganizationSubscribeFiles: [],
}

export default produce((draft, action = {}) => {
  switch (action.type) {
    case 'GET_USER_NAV_ORGANIZATION_SUBSCRIBE_FILES':
      draft.userNavOrganizationSubscribeFiles = action.payload
      return
    case 'SHOW_ORGANIZATION':
      draft.organization = action.payload
      return
    case 'DELETE_ORGANIZATION_FILE':
      const datadelete = draft.userOrganizationSubscribeFiles.findIndex(
        (i: any) => i.uuid === action.payload
      )
      if (datadelete !== -1) draft.userOrganizationSubscribeFiles.splice(datadelete, 1)
      return draft
    default:
  }
}, initialState)
