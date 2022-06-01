/* eslint-disable jsx-a11y/anchor-is-valid */
// import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import { OneApplicationTokenResponse } from '../core/_moduls';
import { useState } from 'react';
// import { VoucherShowModal } from './VoucherShowModal';
import Swal from 'sweetalert2';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type Props = {
  item?: OneApplicationTokenResponse;
}

const ApplicationTokenTable: React.FC<Props> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopiedClick = () => {
    setCopied(true);
    setTimeout(() => { setCopied(false) }, 1500);
  }

  return (
    <>
      <CopyToClipboard text={`${item?.token}`}>
        <div key={item?.id} className="mb-10" onClick={() => handleCopiedClick()}>
          <div className="d-flex">
            <input type="text" className={`form-control form-control-solid me-3 flex-grow-1 ${copied ? 'bg-primary text-inverse-primary' : ''} `} name="token" defaultValue={item?.token} />
            <button className="btn btn-light fw-bolder flex-shrink-0">{copied ? 'Copied': 'Copy Key'}</button>
          </div>
        </div>
      </CopyToClipboard>

    </>
  )
}

export { ApplicationTokenTable }
