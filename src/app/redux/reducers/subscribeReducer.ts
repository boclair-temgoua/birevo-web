import produce from 'immer'

const initialState: any = {
  subscribe: [],
  organizationSubscribes: [],
  contributorSubscribes: [],
}

export default produce((draft, action = {}) => {
  switch (action.type) {
    case 'GET_ORGANIZATIONS_USER_SUBSCRIBES':
      draft.organizationSubscribes = action.payload
      return
    case 'SHOW_SUBSCRIBE':
      draft.subscribe = action.payload
      return
    case 'GET_USER_NAV_SUBSCRIBE':
      draft.contributorSubscribes = action.payload
      return
    default:
  }
}, initialState)
