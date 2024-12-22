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

export default function InvalidDomain({
  email = "panic@thedis.co",
  domain = "dub.sh",
  workspaceSlug = "dub",
  invalidDays = 14,
  appDomain = "dub.co",
}: {
  email: string;
  domain: string;
  workspaceSlug: string;
  invalidDays: number;
  appDomain: string;
}): JSX.Element {
const { t } = useTranslation("../emails");

  const notificationSettingsUrl = `https://app.${appDomain}/${workspaceSlug}/settings/notifications`;

  return (
    <Html>
      <Head />
      <Preview>{t('invalid-domain-configuration')}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('invalid-domain-configuration-whitespace')}</Heading>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="domain-workspace-invalid-notice"
values={{ _domain_: <>{domain}</>, workspaceSlug, invalidDays }}
components={{"0": <code className="text-purple-600" />, "1": 
              <Link
                href={`https://app.dub.co/${workspaceSlug}`}
                className="font-medium text-blue-600 no-underline"
               />}}
/></Text>
            <Text className="text-sm leading-6 text-black">{t('domain-configuration-warning')}</Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspaceSlug}/settings/domains`}
              >{t('configure-domain-button')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="domain-deletion-option"
components={{"0": 
              <Link
                href={`https://app.dub.co/${workspaceSlug}/settings/domains`}
                className="font-medium text-blue-600 no-underline"
               />}}
/>
              {invalidDays < 28
                ? `we will only send you one more email about this in ${
                    28 - invalidDays
                  } days.`
                : "this will be the last time we will email you about this."}
            </Text>
            <Footer
              email={email}
              notificationSettingsUrl={notificationSettingsUrl}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
