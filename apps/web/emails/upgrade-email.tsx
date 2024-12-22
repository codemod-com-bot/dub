import { useTranslation, Trans } from "react-i18next";
import { DUB_WORDMARK, getPlanDetails } from "@dub/utils";
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

export default function UpgradeEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
  plan = "Pro",
}: {
  name: string | null;
  email: string;
  plan: string;
}) {
const { t } = useTranslation("../emails");

  const planDetails = getPlanDetails(plan);
  return (
    <Html>
      <Head />
      <Preview>{t('thank-you-for-upgrading-to-dub-co-{plan}', { plan })}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('thank-you-for-upgrading-to-dub-co-{plan}-newline', { plan })}</Heading>
            <Section className="my-8">
              <Img
                src="https://assets.dub.co/misc/thank-you-thumbnail.jpg"
                alt={t('thank-you')}
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">{t('hey')}{name && ` ${name}`}{t('exclamation-mark')}</Text>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="my-name-is-steven-and-im-the-founder-of-dub"
values={{ plan }}
components={{"0": 
              <Link
                href={planDetails.link}
                className="font-medium text-blue-600 no-underline"
               />}}
/></Text>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="as-you-might-already-know-we-are-fully-open-source-business"
components={{"0": 
              <Link
                href="https://d.to/github"
                className="font-medium text-blue-600 no-underline"
               />}}
/></Text>
            <Text className="text-sm leading-6 text-black">{t('on-the-{plan}-plan-you-now-have-access-to', { plan })}</Text>
            {planDetails.features.map((feature) => (
              <Text className="ml-1 text-sm leading-4 text-black">
                ◆{" "}
                {feature.footnote?.href ? (
                  <Link href={feature.footnote.href}>{feature.text}</Link>
                ) : (
                  feature.text
                )}
              </Text>
            ))}
            <Text className="text-sm leading-6 text-black">{t('let-me-know-if-you-have-any-questions-or-feedback')}</Text>
            <Text className="text-sm font-light leading-6 text-gray-400">{t('steven-from-dub')}</Text>
            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
