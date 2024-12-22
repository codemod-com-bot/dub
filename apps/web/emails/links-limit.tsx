import { useTranslation, Trans } from "react-i18next";
import { DUB_WORDMARK, capitalize, getNextPlan, nFormatter } from "@dub/utils";
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
import { WorkspaceProps } from "../lib/types";
import Footer from "./components/footer";

export default function LinksLimitAlert({
  email = "panic@thedis.co",
  workspace = {
    id: "ckqf1q3xw0000gk5u2q1q2q1q",
    name: "Acme",
    slug: "acme",
    linksUsage: 800,
    linksLimit: 1000,
    plan: "pro",
  },
}: {
  email: string;
  workspace: Partial<WorkspaceProps>;
}) {
const { t } = useTranslation("../emails");

  const { slug, name, linksUsage, linksLimit, plan } = workspace as {
    slug: string;
    name: string;
    linksUsage: number;
    linksLimit: number;
    plan: string;
  };
  const percentage = Math.round((linksUsage / linksLimit) * 100);
  const nextPlan = getNextPlan(plan as string);

  return (
    <Html>
      <Head />
      <Preview>{t('your-dub-workspace-name-has-used', { name })}{percentage.toString()}{t('percentage-of-links-limit-for-the-month')}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('dub-co-links-limit-alert')}</Heading>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="your-dub-co-workspace-has-used-percentage-of-monthly-links-limit"
values={{ _strong_name_strong_: <>
                <strong>{name}</strong></> }}
components={{"0": 
              <Link
                href={`https://app.dub.co/${slug}`}
                className="text-black underline"
               />, "1": <strong />}}
/>{capitalize(plan)}<Trans
i18nKey="you-have-created-total-links-out-of-maximum-links"
components={{"0": 
              <strong />}}
/>{nFormatter(linksLimit, { full: true })}{t('links-in-your-current-billing-cycle')}</Text>

            {plan === "business-max" || plan === "enterprise" ? (
              <Text className="text-sm leading-6 text-black">{t('since-you-are-on-the-plan')}{capitalize(plan)}{t('you-can-continue-to-create-links-without-interruption')}</Text>
            ) : percentage === 100 ? (
              <Text className="text-sm leading-6 text-black"><Trans
i18nKey="existing-links-will-continue-to-work-upgrade-plan"
components={{"0": 
                <Link
                  href={nextPlan.link}
                  className="font-medium text-blue-600 no-underline"
                 />}}
/></Text>
            ) : (
              <Text className="text-sm leading-6 text-black"><Trans
i18nKey="once-you-hit-your-limit-upgrade-plan"
components={{"0": 
                <Link
                  href={nextPlan.link}
                  className="font-medium text-blue-600 no-underline"
                 />}}
/></Text>
            )}
            <Section className="mb-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${slug}/upgrade`}
              >{t('upgrade-my-plan')}</Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
