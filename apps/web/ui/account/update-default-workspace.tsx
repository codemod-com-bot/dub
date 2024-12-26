"use client";
import { useTranslations } from "next-intl";

import useWorkspaces from "@/lib/swr/use-workspaces";
import { Button, InputSelect, InputSelectItemProps } from "@dub/ui";
import { DICEBEAR_AVATAR_URL } from "@dub/utils";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function UpdateDefaultWorkspace() {
  const t = useTranslations("../ui/account");

  const { data: session, update } = useSession();
  const { workspaces } = useWorkspaces();

  const selectOptions = useMemo(() => {
    return workspaces
      ? workspaces.map((workspace) => ({
          id: workspace.slug,
          value: workspace.name,
          image: workspace.logo || `${DICEBEAR_AVATAR_URL}${workspace.name}`,
          disabled: workspace.slug === session?.user?.["defaultWorkspace"],
          label:
            workspace.slug === session?.user?.["defaultWorkspace"]
              ? "Current"
              : "",
        }))
      : [];
  }, [workspaces, session]);

  const [selectedWorkspace, setSelectedWorkspace] =
    useState<InputSelectItemProps | null>(null);

  useEffect(() => {
    setSelectedWorkspace(
      selectOptions.find(
        (option) => option.id === session?.user?.["defaultWorkspace"],
      ) || null,
    );
  }, [selectOptions, session]);

  const [saving, setSaving] = useState(false);

  async function updateDefaultWorkspace() {
    setSaving(true);
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defaultWorkspace: selectedWorkspace?.id || undefined,
      }),
    });

    if (response.ok) {
      setSaving(false);
      update();
    } else {
      setSaving(false);
      const { error } = await response.json();
      throw new Error(error.message);
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise(updateDefaultWorkspace(), {
          loading: "Saving changes...",
          success: "Successfully updated your default workspace!",
          error: (error) => error,
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">{t("your-default-workspace")}</h2>
        <p className="text-sm text-gray-500">
          {t("choose-workspace-to-show-by-default")}
        </p>
        <div className="mt-1 max-w-md">
          <InputSelect
            items={selectOptions}
            selectedItem={selectedWorkspace}
            setSelectedItem={setSelectedWorkspace}
            adjustForMobile
          />
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4 rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 sm:px-10">
        <a
          href="https://dub.co/help/article/how-to-change-default-workspace"
          target="_blank"
          className="text-sm text-gray-500 underline underline-offset-4 hover:text-gray-700"
        >
          {t("learn-more-about-default-workspaces")}
        </a>
        <div>
          <Button
            text={t("save-changes")}
            loading={saving}
            disabled={
              !selectedWorkspace ||
              selectedWorkspace.id === session?.user?.["defaultWorkspace"]
            }
          />
        </div>
      </div>
    </form>
  );
}
