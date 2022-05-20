import { Helmet } from 'react-helmet'
import { FC } from 'react'

export const HelmetSite: FC<{ title: string, description?: string }> = ({ title, description }) => {
  // State and setters for debounced value
  return (
    <Helmet>
      <title>
        {title || process.env.REACT_APP_NAME} | {process.env.REACT_APP_NAME}
      </title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
