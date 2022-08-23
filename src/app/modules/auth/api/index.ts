import dyaxios from '../../../utility/commons/dyaxios'
import {LoginModel, ForgotPasswordModel, ResetPasswordModel, RegisterModel} from '../core/_models'

export const loginApi = (payload: LoginModel) => {
  return dyaxios.post(`/login`, payload)
}

export const registerApi = (payload: RegisterModel) => {
  return dyaxios.post<RegisterModel>(`/register`, payload)
}

export const forgotPasswordApi = (payload: ForgotPasswordModel) => {
  return dyaxios.post<ForgotPasswordModel>(`/password/reset`, payload)
}

export const resetPasswordApi = (payload: ResetPasswordModel) => {
  return dyaxios.put<ResetPasswordModel>(`/password/update/${payload?.token}`, payload)
}
