import { FC } from 'react';
import { useAuth } from '../auth'
import { ProfileMethodCard } from './components/ProfileMethodCard'
import { SignInMethodCard } from './components/SignInMethodCard'
import { HelmetSite } from '../../utility/commons/helmet-site';
import { DeactivateAccountForm } from './hook/DeactivateAccountForm'

const ProfileSettingsPage: FC = () => {
  const userItem = useAuth();
  return (
    <>
      <HelmetSite title={`Profile - ${userItem?.organization?.name || process.env.REACT_APP_NAME}`} />
      <ProfileMethodCard />
      <SignInMethodCard />
      {/* <ConnectedAccounts /> */}
      {/* <EmailPreferences />
      <Notifications /> */}
      <DeactivateAccountForm />
    </>
  )
}
export { ProfileSettingsPage }
