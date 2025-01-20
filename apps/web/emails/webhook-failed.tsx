import { WEBHOOK_FAILURE_DISABLE_THRESHOLD } from "@/lib/webhook/constants";
import { DUB_WORDMARK } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { useTranslations } from "next-intl";
import Footer from "./components/footer";

export default function WebhookFailed({
  email = "panic@thedis.co",
  workspace = {
    name: "Acme, Inc",
    slug: "acme",
  },
  webhook = {
    id: "wh_tYedrqsWgNJxUwQOaAnupcUJ1",
    url: "https://example.com/webhook",
    consecutiveFailures: 15,
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
  };
  webhook: {
    id: string;
    url: string;
    consecutiveFailures: number;
  };
}) {
  const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t("webhook-failing-deliver")}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt="Dub.co"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              {t("webhook-failing-deliver-whitespace")}
            </Heading>
            <Text className="text-sm leading-6 text-black">
              {t("webhook-url-failed-deliver", {
                component0: <strong>{webhook.url}</strong>,
              })}
              {webhook.consecutiveFailures}
              {t("webhook-failure-disable-threshold", {
                WEBHOOK_FAILURE_DISABLE_THRESHOLD:
                  WEBHOOK_FAILURE_DISABLE_THRESHOLD,
              })}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("review-webhook-details")}
            </Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/webhooks/${webhook.id}/edit`}
              >
                {t("edit-webhook")}
              </Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
