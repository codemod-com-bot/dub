import useWorkspace from "@/lib/swr/use-workspace";
import { Button, Download, TooltipContent } from "@dub/ui";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { toast } from "sonner";
import { EventsContext } from "./events-provider";

export default function ExportButton({ onClick }: { onClick?: () => void }) {
  const t = useTranslations("../ui/analytics/events");

  const { exportQueryString } = useContext(EventsContext);
  const { slug, plan, conversionEnabled } = useWorkspace();

  const needsHigherPlan =
    (plan === "free" || plan === "pro") && !conversionEnabled;

  async function exportData() {
    const response = await fetch(`/api/events/export?${exportQueryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Dub Events Export - ${new Date().toISOString()}.csv`;
    a.click();
  }

  return (
    <Button
      variant="outline"
      icon={<Download className="h-4 w-4 shrink-0" />}
      className="h-9 justify-start px-2 text-black"
      text={t("download-as-csv")}
      disabledTooltip={
        needsHigherPlan && (
          <TooltipContent
            title={t("upgrade-business-plan-csv-downloads")}
            cta="Upgrade to Business"
            href={`/${slug}/upgrade`}
          />
        )
      }
      onClick={() => {
        toast.promise(exportData(), {
          loading: "Exporting file...",
          success: "Exported successfully",
          error: (error) => error,
        });
        onClick?.();
      }}
    />
  );
}
