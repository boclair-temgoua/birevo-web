import dyaxios from '../../../utility/commons/dyaxios'
import {LoginModel, ForgotPasswordModel, ResetPasswordModel} from '../core/_models'

export const loginApi = (payload: LoginModel) => {
  return dyaxios.post(`/login`, payload)
}

export const forgotPasswordApi = (payload: ForgotPasswordModel) => {
  return dyaxios.post<ForgotPasswordModel>(`/reset-password`, payload)
}

export const resetPasswordApi = (payload: ResetPasswordModel) => {
  return dyaxios.put<ResetPasswordModel>(`/update-reset-password`, payload)
}
