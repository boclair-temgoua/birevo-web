import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { TextInput } from '../../forms/TextInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const CreateBillingPayPal: React.FC = () => {

  return (
    <>
      <div className="mb-10 fv-row" id="kt_ecommerce_add_product_discount_fixed">
          <div className='text-center'>
            <button
              type='submit'
              className='btn btn-lg btn-primary w-100 mb-5'
            >
              <span className='indicator-label'>Submit PayPal Payment</span>
            </button>
          </div>

      </div>

    </>
  )
}
