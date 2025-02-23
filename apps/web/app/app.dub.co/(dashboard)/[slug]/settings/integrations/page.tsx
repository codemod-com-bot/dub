import { useTranslations } from "next-intl";
import { IntegrationsList } from "./integrations-list";

export const revalidate = 300; // 5 minutes

export default function IntegrationsPage() {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/settings/integrations",
  );

  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col gap-12">
      <div className="">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          {t("integrations-title")}
        </h1>
        <p className="mb-2 mt-2 text-base text-neutral-600">
          {t("integrations-description")}
        </p>
      </div>
      <IntegrationsList />
    </div>
  );
}
