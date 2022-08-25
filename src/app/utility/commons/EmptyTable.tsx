import { toAbsoluteUrl } from '../../../_metronic/helpers/AssetHelpers';


export const EmptyTable: React.FC = () => {
    return (
        <tr className="odd">
            <td colSpan={10} className="dataTables_empty">
                <div className="d-flex flex-column flex-center">
                    <img src={toAbsoluteUrl('/media/illustrations/sketchy-1/5.png')} className="mw-400px" />
                    <div className="fs-1 fw-bolder text-dark mb-4">No items found.</div>
                    <div className="fs-6">Start creating new folders!</div>
                </div>
            </td>
        </tr>
    );
};