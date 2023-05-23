export interface LoginFormType {
  email: string;
  password: string;
}

export interface SignUpFormType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  uid: string;
  username: string;
  email: string;
  profileUrl?: string;
}

export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
