import { useTranslation } from "react-i18next";
import { Webhook } from "lucide-react";
import EmptyState from "../shared/empty-state";

export const NoEventsPlaceholder = () => {
const { t } = useTranslation("../ui/webhooks");

  return (
    <div className="rounded-xl border border-gray-200 py-10">
      <EmptyState
        icon={Webhook}
        title={t('no-events')}
        description={t('no-events-logged-for-webhook')}
      />
    </div>
  );
};
