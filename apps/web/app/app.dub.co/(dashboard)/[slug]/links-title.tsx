"use client";
import { useTranslations } from "next-intl";

import useWorkspace from "@/lib/swr/use-workspace";
import { FolderSwitcher } from "@/ui/folders/folder-switcher";

/**
 * Renders the title for the links page ("Links"), or the folder switcher if the linkFolders feature flag is enabled
 * We can remove this component when removing the linkFolders feature flag
 */
export function LinksTitle() {
  const t = useTranslations("app.dub.co/(dashboard)/[slug]");

  const { flags } = useWorkspace();

  return flags?.linkFolders ? <FolderSwitcher /> : <h1>{t("links")}</h1>;
}
