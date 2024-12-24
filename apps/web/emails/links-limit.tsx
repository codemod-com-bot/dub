import { useTranslations } from "next-intl";
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
const t = useTranslations("../emails");

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
      <Preview>{t('your-dub-workspace-usage', { "name": name })}{percentage.toString()}{t('percentage-of-links-limit')}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t('dub-identifier')}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('dub-co-links-limit-alert')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('workspace-links-usage-details', { "component0": {t('workspace-links-usage-details_component0', { "_strong_name_strong_": _strong_name_strong_ })}, "component1": <strong>{percentage.toString()}{t('workspace-links-usage-details_component1')}</strong> })}
              {capitalize(plan)}{t('total-links-created', { "component0": <strong>{nFormatter(linksUsage, { full: true })}{t('total-links-created_component0')}</strong> })}
              {nFormatter(linksLimit, { full: true })}{t('links-in-current-billing-cycle')}</Text>

            {plan === "business-max" || plan === "enterprise" ? (
              <Text className="text-sm leading-6 text-black">{t('current-plan-notification')}{capitalize(plan)}{t('links-creation-after-limit')}</Text>
            ) : percentage === 100 ? (
              <Text className="text-sm leading-6 text-black">{t('existing-links-continue-working', { "component0": <Link
                  href={nextPlan.link}
                  className="font-medium text-blue-600 no-underline"
                >
                  {nextPlan.name}{t('existing-links-continue-working_component0')}</Link> })}
                </Text>
            ) : (
              <Text className="text-sm leading-6 text-black">{t('upgrade-plan-after-limit', { "component0": <Link
                  href={nextPlan.link}
                  className="font-medium text-blue-600 no-underline"
                >
                  {nextPlan.name}{t('upgrade-plan-after-limit_component0')}</Link> })}
                </Text>
            )}
            <Section className="mb-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${slug}/upgrade`}
              >{t('upgrade-my-plan-button')}</Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
