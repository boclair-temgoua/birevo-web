import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { TextInput } from '../../forms/TextInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OrganizationUpdateMutation, UpdateOrganizationRequest } from '../core/_models';

interface Props {
  setOpenModal: any,
  organizationItem?: any
}

const schema = yup
  .object({
    name: yup.string().min(3, 'Minimum 3 symbols').required(),
  })
  .required();

export const OrganizationUpdateFormModal: React.FC<Props> = ({ setOpenModal, organizationItem }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset, setValue,
    formState: { errors, isSubmitted, isDirty, isValid }
  } = useForm<UpdateOrganizationRequest>({ resolver: yupResolver(schema), mode: "onChange" });

  useEffect(() => {
    if (organizationItem) {
      const fields = ['name'];
      fields?.forEach((field: any) => setValue(field, organizationItem[field]));
    }
  }, [organizationItem]);

  const updateOrganizationMutation = OrganizationUpdateMutation({
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
      const organization_uuid = organizationItem?.uuid
      const payloadSave: UpdateOrganizationRequest = { organization_uuid, ...data }
      const payloadUpdate: UpdateOrganizationRequest = { organization_uuid, ...data }
      !organizationItem ?
        updateOrganizationMutation.mutateAsync(payloadSave)
        : updateOrganizationMutation.mutateAsync(payloadUpdate)
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
        <div className='modal-dialog modal-dialog-centered mw-650px modal-dialog-scrollable'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header">
              <h5 className="modal-title">{organizationItem ? organizationItem?.name : 'Organization'} </h5>
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
