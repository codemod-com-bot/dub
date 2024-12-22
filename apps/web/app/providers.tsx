"use client";
import { I18nextProvider } from "react-i18next";

import { i18n } from "./i18n";


import { PosthogPageview } from "@/ui/layout/posthog-pageview";
import { Analytics as DubAnalytics } from "@dub/analytics/react";
import { KeyboardShortcutProvider, TooltipProvider } from "@dub/ui";
import PlausibleProvider from "next-plausible";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/_proxy/posthog/ingest",
    ui_host: "https://us.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable pageleave capture
  });
}

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
<PostHogProvider client={posthog}>
      <PlausibleProvider
        domain="dub.co"
        revenue
        scriptProps={{
          src: "/_proxy/plausible/script.js",
          // @ts-ignore
          "data-api": "/_proxy/plausible/event",
        }}
      />
      <TooltipProvider>
        <KeyboardShortcutProvider>
          <Toaster closeButton className="pointer-events-auto" />
          <PosthogPageview />
          {children}
          <DubAnalytics />
        </KeyboardShortcutProvider>
      </TooltipProvider>
    </PostHogProvider>
</I18nextProvider>
  );
}
