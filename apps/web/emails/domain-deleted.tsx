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

export default function DomainDeleted({
  email = "panic@thedis.co",
  domain = "dub.sh",
  workspaceSlug = "dub",
}: {
  email: string;
  domain: string;
  workspaceSlug: string;
}) {
const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('domain-deleted')}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t('dub-quote')}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('domain-deleted-whitespace')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('domain-deleted-notice', { "component0": {t('domain-deleted-notice_component0', { "_domain_": <>{domain}</> })}, "component1": <Link
                href={`https://app.dub.co/${workspaceSlug}`}
                className="font-medium text-blue-600 no-underline"
              >
                {t('domain-deleted-notice_component1', { "workspaceSlug": workspaceSlug })}</Link> })}
              </Text>
            <Text className="text-sm leading-6 text-black">{t('domain-restore-instructions')}</Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspaceSlug}/settings/domains`}
              >{t('add-domain-prompt')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('ignore-email-notice')}</Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
