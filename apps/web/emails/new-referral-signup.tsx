import { useTranslations } from "next-intl";
import { REFERRAL_CLICKS_QUOTA_BONUS } from "@/lib/embed/constants";
import { DUB_WORDMARK, getPrettyUrl } from "@dub/utils";
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

export default function NewReferralSignup({
  email = "panic@thedis.co",
  workspace = {
    name: "Acme, Inc",
    slug: "acme",
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
  };
}) {
const t = useTranslations("../emails");

  const referralLink = `https://refer.dub.co/${workspace.slug}`;
  return (
    <Html>
      <Head />
      <Preview>{t('new-referral-signup')}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('new-referral-signup-whitespace')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('congratulations-new-signup-referral', { "component0": {t('congratulations-new-signup-referral_component0', { "_getPrettyUrl_referralLink_": <>{getPrettyUrl(referralLink)}</> })} })}
              
            </Text>
            <Text className="text-sm leading-6 text-black">{t('thank-you-referral-bonus-quota', { "REFERRAL_CLICKS_QUOTA_BONUS": REFERRAL_CLICKS_QUOTA_BONUS, "component0": {t('thank-you-referral-bonus-quota_component0', { "_workspace_name_": <>{workspace.name}</> })} })}
              </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}`}
              >{t('view-referral-stats')}</Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
