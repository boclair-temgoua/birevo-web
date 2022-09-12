import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { TextInput } from '../../forms/TextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getCountries } from '../../currency/api/index';
import { useQuery } from '@tanstack/react-query';
import { UserAddressCreateMutation, UserAddressFormRequest, UserAddressResponse } from '../core/_moduls';
import { SelectValueIdInput } from '../../forms/SelectValueIdInput';

interface Props {
  setOpenCreateOrUpdateModal: any,
  userAddress?: UserAddressResponse | any
}

const schema = yup
  .object({
    city: yup.string().required(),
    region: yup.string().required(),
    countryId: yup.number().required(),
    street1: yup.string().required('street required'),
    phone: yup.string().min(7, 'Minimum 7 symbols').required(),
  })
  .required();

export const UserAddressCreateFormModal: React.FC<Props> = ({ setOpenCreateOrUpdateModal, userAddress }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, setValue,
    formState: { errors, isDirty, isValid }
  } = useForm<UserAddressFormRequest>({ resolver: yupResolver(schema), mode: "onChange" });

  const {
    data: dataCountries,
  } = useQuery(['countries'], () => getCountries())
  const countries = dataCountries?.data

  useEffect(() => {
    if (userAddress) {
      const fields = ['company', 'city', 'phone', 'region', 'street1', 'street2', 'cap', 'countryId'];
      fields?.forEach((field: any) => setValue(field, userAddress[field]));
    }
  }, [userAddress]);

  const saveMutation = UserAddressCreateMutation({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false)
      setOpenCreateOrUpdateModal(false)
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      setOpenCreateOrUpdateModal(true)
    }
  });


  const onSubmit = (data: any) => {
    setLoading(true);
    setHasErrors(undefined)
    setTimeout(async () => {
      const user_address_uuid = userAddress?.uuid
      const payloadSave: UserAddressFormRequest = { ...data }
      const payloadUpdate: UserAddressFormRequest = { user_address_uuid, ...data }
      !user_address_uuid ?
        saveMutation.mutateAsync(payloadSave)
        : saveMutation.mutateAsync(payloadUpdate)
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
        <div className='modal-dialog modal-dialog-centered mw-1000px modal-dialog-scrollable'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <div className="mb-8 text-center">
                <h1 className="mb-3">{userAddress?.uuid ? 'Update' : 'Create New'} Address</h1>
                <div className="text-muted fw-bold fs-5">
                  This address appears on your monthly invoice and should be the legal address of your home or business.
                </div>
                {hasErrors && (
                  <div className="text-center alert alert-danger">
                    <div className="d-flex flex-column">
                      <h4 className="mb-1 text-danger">Error</h4>
                      <span>{hasErrors}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* <UserEditModalFormWrapper /> */}
              <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-6">
                  <div className="fv-row mb-0">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Company"
                      register={register}
                      errors={errors}
                      name="company"
                      type="text"
                      autoComplete="one"
                      placeholder="Enter company (optional)"
                      validation={{ required: false }}
                      isRequired={false}
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <div className='fv-row mb-0'>
                    <SelectValueIdInput
                      dataItem={countries}
                      isValueInt={true}
                      className="form-control form-select select2-hidden-accessible"
                      labelFlex="Country"
                      register={register}
                      errors={errors}
                      name="countryId"
                      validation={{ required: true }}
                      isRequired={true}
                      required="required"
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <div className="fv-row mb-0">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Phone number"
                      register={register}
                      errors={errors}
                      name="phone"
                      type="text"
                      autoComplete="one"
                      placeholder="Phone number"
                      validation={{ required: true }}
                      isRequired={true}
                      required="required"
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Address Line 1"
                      register={register}
                      errors={errors}
                      name="street1"
                      type="text"
                      autoComplete="one"
                      placeholder="Address Line 1"
                      validation={{ required: true }}
                      isRequired={true}
                      required="required"
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Address Line 2"
                      register={register}
                      errors={errors}
                      name="street2"
                      type="text"
                      autoComplete="one"
                      placeholder="Address Line 2 (optional)"
                      validation={{ required: false }}
                      isRequired={false}
                    />
                  </div>
                </div>
                <div className="row mb-6">
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="City"
                      register={register}
                      errors={errors}
                      name="city"
                      type="text"
                      autoComplete="one"
                      placeholder="Enter city (optional)"
                      validation={{ required: true }}
                      isRequired={true}
                      required="required"
                    />
                  </div>
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="State / Province / Region"
                      register={register}
                      errors={errors}
                      name="region"
                      type="text"
                      autoComplete="one"
                      placeholder="State / Province / Region"
                      validation={{ required: true }}
                      isRequired={true}
                      required="required"
                    />
                  </div>
                  <div className="col-md-4 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Zip / Postal Code"
                      register={register}
                      errors={errors}
                      name="cap"
                      type="text"
                      autoComplete="one"
                      placeholder="Zip / Postal Code"
                      validation={{ required: false }}
                      isRequired={false}
                    />
                  </div>
                </div>



                <div className="text-center">
                  <button type="button" onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-light me-3">Cancel</button>
                  <button type='submit' className='btn btn-lg btn-primary fw-bolder'
                    disabled={!isDirty || !isValid || loading}
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
                <div>
                </div>
              </form>
            </div>
            {/* end::Modal body */}
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
