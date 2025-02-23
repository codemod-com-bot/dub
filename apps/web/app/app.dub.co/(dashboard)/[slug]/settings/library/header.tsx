"use client";
import { useTranslations } from "next-intl";

import useWorkspace from "@/lib/swr/use-workspace";
import { TabSelect } from "@dub/ui";
import { redirect, useRouter, useSelectedLayoutSegment } from "next/navigation";

export default function LibraryHeader() {
  const t = useTranslations("app.dub.co/(dashboard)/[slug]/settings/library");

  const router = useRouter();
  const { slug, flags } = useWorkspace();

  const selectedLayoutSegment = useSelectedLayoutSegment();
  const page = selectedLayoutSegment === null ? "" : selectedLayoutSegment;

  if (selectedLayoutSegment === null) {
    redirect(
      `/${slug}/settings/library/${flags?.linkFolders ? "folders" : "tags"}`,
    );
  }

  return (
    <div className="border-b border-neutral-200">
      <h1 className="text-2xl font-semibold tracking-tight text-black">
        {t("library-title")}
      </h1>
      <p className="mb-2 mt-2 text-base text-neutral-600">
        {t("manage-links-description")}
      </p>
      <TabSelect
        variant="accent"
        options={[
          ...(flags?.linkFolders
            ? [
                {
                  id: "folders",
                  label: "Folders",
                },
              ]
            : []),
          { id: "tags", label: "Tags" },
          { id: "utm", label: "UTM Templates" },
        ]}
        selected={page}
        onSelect={(id) => {
          router.push(`/${slug}/settings/library/${id}`);
        }}
      />
    </div>
  );
}
