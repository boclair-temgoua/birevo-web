import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
import { ContributorUpdateMutation, optionsRoles, UpdateContributorRequest } from '../core/_models';
import { SelectValueIdInput } from '../../forms';

interface Props {
  setOpenModal: any,
  subscribeUserItem?: OneContributorSubscribeResponse | any
}

const schema = yup
  .object({
    roleId: yup.number().required(),
  })
  .required();

export const ContributorUpdateFormModal: React.FC<Props> = ({ setOpenModal, subscribeUserItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, setValue,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<UpdateContributorRequest>({ resolver: yupResolver(schema), mode: "onChange" });

  useEffect(() => {
    if (subscribeUserItem) {
      const fields = ['roleId'];
      fields?.forEach((field: any) => setValue(field, subscribeUserItem[field]));
    }
  }, [subscribeUserItem]);

  const saveItemMutation = ContributorUpdateMutation({
    onSuccess: () => {
      setOpenModal(false)
      setHasErrors(false);
      setLoading(false)
    },
  });


  const onSubmit = (data: UpdateContributorRequest) => {
    setLoading(true);
    setHasErrors(undefined)
    setTimeout(async () => {
      const subscribe_uuid = subscribeUserItem?.uuid
      const contributorId = Number(subscribeUserItem?.userId)
      const payloadUpdate: UpdateContributorRequest = { ...data, subscribe_uuid, contributorId, }
      saveItemMutation.mutateAsync(payloadUpdate)
    }, 1000)

  };

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-750px modal-dialog-scrollable'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div onClick={() => { setOpenModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
              {/* begin::Modal body */}
              <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                <div className="fv-row fv-plugins-icon-container">
                  <SelectValueIdInput
                    firstOptionName="Choose value"
                    dataItem={optionsRoles}
                    isValueInt={true}
                    className="form-control"
                    labelFlex="Role name"
                    register={register}
                    errors={errors}
                    name="roleId"
                    validation={{ required: true }}
                    isRequired={true}
                    required="required"
                  />
                </div>
              </div>
              {/* end::Modal body */}
              <div className="modal-footer flex-center">
                <button type="button" onClick={() => { setOpenModal(false) }} className="btn btn-light me-3">Cancel</button>
                <button type='submit' className='btn btn-lg btn-primary fw-bolder'
                  disabled={!isDirty || !isValid || isSubmitted}
                >
                  {!loading && <span className='indicator-label'>Submit</span>}
                  {loading && (
                    <span className='indicator-progress' style={{ display: 'block' }}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}
