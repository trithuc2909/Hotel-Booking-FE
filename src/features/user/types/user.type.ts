export type UserProfileResponse = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  avatarUrl: string;
  address: string;
  nationality: string;
  dateOfBirth: string;
};

export type UpdateUserProfileRequest = {
  fullName?: string;
  phone?: string;
  address?: string;
  nationality?: string;
  dateOfBirth?: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};