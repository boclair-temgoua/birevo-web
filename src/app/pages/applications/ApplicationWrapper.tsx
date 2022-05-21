/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import {
  TablesWidget5,
} from '../../../_metronic/partials/widgets'

const ApplicationPage: FC = () => (
  <>
    <div className='col-xxl-12'>
      <TablesWidget5 className='card-xxl-stretch mb-xxl-12' />
    </div>
  </>
)

const ApplicationWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.APPS' })}</PageTitle>
      <ApplicationPage />
    </>
  )
}

export { ApplicationWrapper }
