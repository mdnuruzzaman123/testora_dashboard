export type AdminProfile = {
  name: string;
  role: string;
  avatarUrl: string;
};

export const adminProfile: AdminProfile = {
  name: "Salman",
  role: "Admin",
  avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=180&h=180&fit=crop",
};

export const profileFormDefaults = {
  username: "Maria",
};

export const passwordFormDefaults = {
  currentPassword: "***********",
  newPassword: "***********",
  confirmPassword: "***********",
};
