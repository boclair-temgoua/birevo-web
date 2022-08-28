import React from 'react'
// import { ConnectedAccounts } from '../accounts/components/settings/cards/ConnectedAccounts'
import { DeactivateAccount } from '../accounts/components/settings/cards/DeactivateAccount'
import { EmailPreferences } from '../accounts/components/settings/cards/EmailPreferences'
import { Notifications } from '../accounts/components/settings/cards/Notifications'
import { ProfileDetails } from '../accounts/components/settings/cards/ProfileDetails'
import { SignInMethod } from '../accounts/components/settings/cards/SignInMethod'
import { useAuth } from '../auth'
import { ProfileMethodCard } from './components/ProfileMethodCard'
import { SignInMethodCard } from './components/SignInMethodCard'
import { HelmetSite } from '../../utility/commons/helmet-site';

export function ProfileSettingsPage() {
  const userItem = useAuth();
  return (
    <>
      <HelmetSite title={`Profile - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <ProfileMethodCard />
      <SignInMethodCard />
      {/* <ConnectedAccounts /> */}
      {/* <EmailPreferences />
      <Notifications /> */}
      <DeactivateAccount />
    </>
  )
}
