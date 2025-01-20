import EmptyState from "@/ui/shared/empty-state";
import { LoadingSpinner } from "@dub/ui";
import { APP_NAME } from "@dub/utils";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import SAMLIDPForm from "./form";

export default function SAMLPage() {
  const t = useTranslations("app.dub.co/(auth)/auth/saml");

  return (
    <>
      <EmptyState
        icon={LoadingSpinner}
        title={t("saml-authentication")}
        description={t("app-name-verifying-identity-saml", {
          APP_NAME: APP_NAME,
        })}
      />
      <Suspense>
        <SAMLIDPForm />
      </Suspense>
    </>
  );
}
