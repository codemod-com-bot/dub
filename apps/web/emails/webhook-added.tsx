import { useTranslations } from "next-intl";
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
      <Preview>{t('new-webhook-added')}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t('dub-co')}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('new-webhook-added-2')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('webhook-added-to-workspace', { "component0": {t('webhook-added-to-workspace_component0', { "_webhook_name_": _webhook_name_ })}, "workspace_name": workspace_name })}</Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/webhooks`}
              >{t('view-webhook')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('delete-this-webhook-warning', { "component0": {t('delete-this-webhook-warning_component0', { "_strong_delete_this_webhook_strong_": _strong_delete_this_webhook_strong_ })} })}
              </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
