"use client";
import { useTranslation } from "react-i18next";


import { Button, FileUpload, getUserAvatarUrl } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UploadAvatar() {
const { t } = useTranslation("../ui/account");

  const { data: session, update } = useSession();

  const [image, setImage] = useState<string | null>();

  useEffect(() => {
    setImage(session?.user ? getUserAvatarUrl(session.user) : null);
  }, [session]);

  const [uploading, setUploading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        setUploading(true);
        e.preventDefault();
        fetch("/api/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image }),
        }).then(async (res) => {
          setUploading(false);
          if (res.status === 200) {
            await update();
            toast.success("Successfully updated your profile picture!");
          } else {
            const errorMessage = await res.text();
            toast.error(errorMessage || "Something went wrong");
          }
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">{t('your-avatar')}</h2>
        <p className="text-sm text-gray-500">{t('this-is-your-avatar-image-on')}{process.env.NEXT_PUBLIC_APP_NAME}{t('end-of-avatar-image')}</p>
        <div className="mt-1">
          <FileUpload
            accept="images"
            className="h-24 w-24 rounded-full border border-gray-300"
            iconClassName="w-5 h-5"
            variant="plain"
            imageSrc={image}
            readFile
            onChange={({ src }) => setImage(src)}
            content={null}
            maxFileSizeMB={2}
            targetResolution={{ width: 160, height: 160 }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4 rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 sm:px-10">
        <p className="text-sm text-gray-500">{t('square-image-recommended-accepted-file-types')}</p>
        <div className="shrink-0">
          <Button
            text={t('save-changes')}
            loading={uploading}
            disabled={!image || session?.user?.image === image}
          />
        </div>
      </div>
    </form>
  );
}
