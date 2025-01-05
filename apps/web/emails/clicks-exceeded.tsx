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

export default function ClicksExceeded({
  email = "panic@thedis.co",
  workspace = {
    id: "ckqf1q3xw0000gk5u2q1q2q1q",
    name: "Acme",
    slug: "acme",
    usage: 2410,
    usageLimit: 1000,
    plan: "business",
  },
  type = "firstUsageLimitEmail",
}: {
  email: string;
  workspace: Partial<WorkspaceProps>;
  type: "firstUsageLimitEmail" | "secondUsageLimitEmail";
}) {
const t = useTranslations("../emails");

  const { slug, name, usage, usageLimit, plan } = workspace;
  const nextPlan = getNextPlan(plan as string);

  return (
    <Html>
      <Head />
      <Preview>{t('your-dub-workspace')}{name || ""}{t('exceeded-plan-limit')}
        {capitalize(plan) || ""}{t('plan-limit-of')}{nFormatter(usageLimit)}{t('link-clicks-per-month')}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t('dub-name')}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('clicks-limit-exceeded')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('workspace-exceeded-plan-limit', { "component0": {t('workspace-exceeded-plan-limit_component0', { "_strong_name_strong_": <><strong>{name}</strong></> })}, "component1": <strong>{t('workspace-exceeded-plan-limit_component1')}{capitalize(plan)}{t('workspace-exceeded-plan-limit_component1')}</strong>, "component2": <strong>{nFormatter(usageLimit)}{t('workspace-exceeded-plan-limit_component2')}</strong>, "component3": <strong>{nFormatter(usage, { digits: 2 })}{t('workspace-exceeded-plan-limit_component3')}</strong> })}
              
              
              </Text>
            <Text className="text-sm leading-6 text-black">{t('upgrade-plan-to-view-stats', { "component0": <Link
                href={nextPlan.link}
                className="font-medium text-blue-600 no-underline"
              >
                {t('upgrade-plan-to-view-stats_component0', { "nextPlan_name": nextPlan.name })}</Link> })}
              </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${slug}/upgrade`}
              >{t('upgrade-my-plan')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('email-notification-about-upgrade')}
              </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
