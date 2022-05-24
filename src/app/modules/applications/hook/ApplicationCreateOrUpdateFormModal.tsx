import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { TextInput } from '../../forms/TextInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ApplicationFormRequest, ApplicationMutation, OneApplicationResponse } from '../core/_moduls';
// import { createOrUpdateOneCoupon } from '../api/index';

interface Props {
  setOpenModal: any,
  applicationItem?: OneApplicationResponse | any
}

const schema = yup
  .object({
    name: yup.string().min(3, 'Minimum 3 symbols').required(),
  })
  .required();

export const ApplicationCreateOrUpdateFormModal: React.FC<Props> = ({ setOpenModal, applicationItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset, setValue,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<ApplicationFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });

  useEffect(() => {
    if (applicationItem) {
      const fields = ['name', 'description'];
      fields?.forEach((field: any) => setValue(field, applicationItem[field]));
    }
  }, [applicationItem]);

  const saveUserMutation = ApplicationMutation({
    onSuccess: () => {
      setOpenModal(false)
      setHasErrors(false);
      setLoading(false)
    },
  });


  const onSubmit = (data: any) => {
    setLoading(true);
    setHasErrors(undefined)
    setTimeout(async () => {
      const application_uuid = applicationItem?.uuid
      const payloadSave: ApplicationFormRequest = { application_uuid, ...data }
      const payloadUpdate: ApplicationFormRequest = { application_uuid, ...data }
      !applicationItem ?
        saveUserMutation.mutateAsync(payloadSave)
        : saveUserMutation.mutateAsync(payloadUpdate)
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
        <div className='modal-dialog mw-650px modal-dialog-scrollable'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header">
              <h5 className="modal-title">{applicationItem ? applicationItem?.name : 'Create API Key'} </h5>
              <div
                onClick={() => { setOpenModal(false) }}
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
              {/* begin::Modal body */}
              <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                {/* <UserEditModalFormWrapper /> */}
                <div className="d-flex flex-column mb-8">
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Name"
                    register={register}
                    errors={errors}
                    name="name"
                    type="text"
                    autoComplete="one"
                    placeholder="Enter name"
                    validation={{ required: true }}
                    required="required"
                    isRequired={true}
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
