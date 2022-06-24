import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../../_metronic/helpers'
import { TextInput } from '../../../forms/TextInput';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RechargePayPalForm from './RechargePayPalForm';

export const CreateBillingPayPal: React.FC = () => {

  return (
    <>
      <RechargePayPalForm />

    </>
  )
}
