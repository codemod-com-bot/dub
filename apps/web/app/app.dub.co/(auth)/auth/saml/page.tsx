import { useTranslation } from "react-i18next";
import EmptyState from "@/ui/shared/empty-state";
import { LoadingSpinner } from "@dub/ui";
import { APP_NAME } from "@dub/utils";
import { Suspense } from "react";
import SAMLIDPForm from "./form";

export default function SAMLPage() {
const { t } = useTranslation("app.dub.co/(auth)/auth/saml");

  return (
    <>
      <EmptyState
        icon={LoadingSpinner}
        title={t('saml-authentication')}
        description={`${APP_NAME} is verifying your identity via SAML. This might take a few seconds...`}
      />
      <Suspense>
        <SAMLIDPForm />
      </Suspense>
    </>
  );
}
