export type OneContributorSubscribeResponse = {
  id: number
  uuid: string
  subscribableType: string
  userId: number
  roleId: number
  userCreatedId: number
  createdAt: Date
  role: {
    name: string
  }
  profile: {
    userId: string
    email: string
    image: string
    color: string
    firstName: string
    lastName: string
    username: string
  }
}

export type OneSubscribeResponse = {
  id: number
  uuid: string
  subscribableType: string
  userId: number
  userCreatedId: number
  subscribableId: number
  createdAt: Date
  roleId: number
  profileCreated: {
    image: string
    username: string
    firstName: string
    lastName: string
    color: string
  }
  role: {
    name: string
  }
  organization: {
    id: number
    name: string
    email: string
    slug: string
    color: string
    userId: number
  }
  contributors: any
}
