"use client";
import { useTranslations } from "next-intl";

import useWorkspace from "@/lib/swr/use-workspace";
import EmptyState from "@/ui/shared/empty-state";
import { Menu3 } from "@dub/ui/icons";
import { useContext } from "react";
import AnalyticsProvider, { AnalyticsContext } from "../analytics-provider";
import Toggle from "../toggle";
import EventsTable from "./events-table";
import EventsTabs from "./events-tabs";

export default function AnalyticsEvents({
  staticDomain,
  staticUrl,
  adminPage,
  demoPage,
}: {
  staticDomain?: string;
  staticUrl?: string;
  adminPage?: boolean;
  demoPage?: boolean;
}) {
  return (
    <AnalyticsProvider {...{ staticDomain, staticUrl, adminPage, demoPage }}>
      <div className="pb-10">
        <Toggle page="events" />
        <div className="mx-auto flex max-w-screen-xl flex-col gap-3 px-3 lg:px-10">
          <EventsTabs />
          <EventsTableContainer />
        </div>
      </div>
    </AnalyticsProvider>
  );
}

function EventsTableContainer() {
  const t = useTranslations("../ui/analytics/events");

  const { selectedTab } = useContext(AnalyticsContext);
  const { plan, slug } = useWorkspace();

  const requiresUpgrade = plan === "free" || plan === "pro";

  return (
    <EventsTable
      key={selectedTab}
      requiresUpgrade={requiresUpgrade}
      upgradeOverlay={
        <EmptyState
          icon={Menu3}
          title={t("real-time-events-stream")}
          description={t("upgrade-business-plan-real-time-stream", {
            selectedTab: selectedTab,
          })}
          learnMore="https://d.to/events"
          buttonText="Upgrade to Business"
          buttonLink={`/${slug}/upgrade`}
        />
      }
    />
  );
}
