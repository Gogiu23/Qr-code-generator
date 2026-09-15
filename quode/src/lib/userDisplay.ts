import { Models } from "appwrite";

export function getInitials(user: Models.User<Models.Preferences>): string {
  const source = user.name?.trim() || user.email.split("@")[0];
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}
