export type OneContributorSubscribeResponse = {
  id: number
  uuid: string
  subscribableType: string
  userId: number
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
  profileCreated: {
    image: string
    username: string
    firstName: string
    lastName: string
    color: string
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
