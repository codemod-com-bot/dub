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

export default function IntegrationInstalled({
  email = "panic@thedis.co",
  workspace = {
    name: "Acme, Inc",
    slug: "acme",
  },
  integration = {
    name: "Slack",
    slug: "slack",
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
  };
  integration: {
    name: string;
    slug: string;
  };
}) {
const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('an-integration-has-been-added-to-your-workspace')}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('an-integration-has-been-added-to-your-workspace-newline')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('the-integration-name-has-been-added-to-your-workspace', { "component0": {t('the-integration-name-has-been-added-to-your-workspace_component0', { "_integration_name_": _integration_name_ })} })}{workspace.name}{t('on-dub-newline')}</Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/integrations/${integration.slug}`}
              >{t('view-installed-integration')}</Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
