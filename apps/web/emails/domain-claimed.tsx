import { useTranslation, Trans } from "react-i18next";
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

export default function DomainClaimed({
  email = "panic@thedis.co",
  domain = "dub.link",
  workspaceSlug = "dub",
}: {
  email: string;
  domain: string;
  workspaceSlug: string;
}) {
const { t } = useTranslation("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('successfully-claimed-your-link-domain')}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t('dub')}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('successfully-claimed-your-link-domain-newline')}</Heading>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="congratulations-claimed-free-domain-for-dub-workspace"
values={{ _domain_: <>{domain}</>, workspaceSlug }}
components={{"0": 
              <code className="text-purple-600" />, "1": 
              <Link
                href={`https://app.dub.co/${workspaceSlug}`}
                className="font-medium text-blue-600 no-underline"
               />}}
/></Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspaceSlug}/settings/domains`}
              >{t('manage-your-domain')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('creating-links-with-domain')}</Text>
            <Text className="text-sm leading-6 text-black">{t('domain-not-active-after-one-hour')}</Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
