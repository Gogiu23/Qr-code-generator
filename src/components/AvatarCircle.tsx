"use client";
import { Models } from "appwrite";
import { storage, APPWRITE_AVATARS_BUCKET_ID } from "@/lib/appwriteClient";
import { getInitials } from "@/lib/userDisplay";
import { UserPrefs } from "@/types/user";

interface AvatarCircleProps {
  user: Models.User<Models.Preferences>;
  size?: number;
  className?: string;
}

export default function AvatarCircle({
  user,
  size = 32,
  className = "",
}: AvatarCircleProps) {
  const avatarFileId = (user.prefs as UserPrefs | undefined)?.avatarFileId;
  const src = avatarFileId
    ? storage.getFileView({
        bucketId: APPWRITE_AVATARS_BUCKET_ID,
        fileId: avatarFileId,
      })
    : null;

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={user.name || user.email}
        width={size}
        height={size}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-accent text-ink font-bold flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {getInitials(user)}
    </div>
  );
}
