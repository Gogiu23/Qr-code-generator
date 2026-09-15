export interface UserPrefs {
  avatarFileId?: string;
  /** ThemeSettings serializado con JSON.stringify — ver src/lib/theme/theme.ts */
  theme?: string;
}
