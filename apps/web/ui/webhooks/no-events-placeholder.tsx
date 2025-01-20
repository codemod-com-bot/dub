import { Webhook } from "lucide-react";
import { useTranslations } from "next-intl";
import EmptyState from "../shared/empty-state";

export const NoEventsPlaceholder = () => {
  const t = useTranslations("../ui/webhooks");

  return (
    <div className="rounded-xl border border-gray-200 py-10">
      <EmptyState
        icon={Webhook}
        title={t("no-events")}
        description={t("no-events-logged-webhook")}
      />
    </div>
  );
};
