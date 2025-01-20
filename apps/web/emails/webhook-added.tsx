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

export default function WebhookAdded({
  email = "panic@thedis.co",
  workspace = {
    name: "Acme, Inc",
    slug: "acme",
  },
  webhook = {
    name: "My Webhook",
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
  };
  webhook: {
    name: string;
  };
}) {
  const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t("new-webhook-added")}</Preview>
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
              {t("new-webhook-added-whitespace")}
            </Heading>
            <Text className="text-sm leading-6 text-black">
              {t("webhook-added-notification", {
                component0: <strong>{webhook.name}</strong>,
              })}
              {workspace.name}.
            </Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/webhooks`}
              >
                {t("view-webhook-button")}
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              {t("delete-webhook-instructions", {
                component0: (
                  <Link
                    href={`https://app.dub.co/${workspace.slug}/settings/webhooks`}
                    className="text-black underline"
                  >
                    <strong>delete this webhook</strong>
                  </Link>
                ),
              })}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
