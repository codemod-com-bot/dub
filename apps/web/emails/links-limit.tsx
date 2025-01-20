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
import { useTranslations } from "next-intl";
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
      <Preview>
        {t("workspace-usage-alert", {
          name: name,
          percentageToString: percentage.toString(),
        })}
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t("dub-name")}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              {t("links-limit-alert-title")}
            </Heading>
            <Text className="text-sm leading-6 text-black">
              {t("workspace-links-usage-notification", {
                component0: (
                  <Link
                    href={`https://app.dub.co/${slug}`}
                    className="text-black underline"
                  >
                    <strong>{name}</strong>
                  </Link>
                ),
                component1: (
                  <strong>
                    {t("workspace-links-usage-notification_component1", {
                      percentageToString: percentage.toString(),
                    })}
                  </strong>
                ),
              })}
              {capitalize(plan)}
              {t("total-links-created", {
                component0: (
                  <strong>
                    {nFormatter(linksUsage, { full: true })}
                    {t("total-links-created_component0")}
                  </strong>
                ),
              })}
              {nFormatter(linksLimit, { full: true })}
              {t("links-remaining-notification")}
            </Text>

            {plan === "business-max" || plan === "enterprise" ? (
              <Text className="text-sm leading-6 text-black">
                {t("current-plan-notification")}
                {capitalize(plan)}
                {t("links-creation-ability-notification")}
              </Text>
            ) : percentage === 100 ? (
              <Text className="text-sm leading-6 text-black">
                {t("upgrade-plan-notification", {
                  component0: (
                    <Link
                      href={nextPlan.link}
                      className="font-medium text-blue-600 no-underline"
                    >
                      {nextPlan.name}
                      {t("upgrade-plan-notification_component0")}
                    </Link>
                  ),
                })}
              </Text>
            ) : (
              <Text className="text-sm leading-6 text-black">
                {t("limit-reached-upgrade-notification", {
                  component0: (
                    <Link
                      href={nextPlan.link}
                      className="font-medium text-blue-600 no-underline"
                    >
                      {nextPlan.name}
                      {t("limit-reached-upgrade-notification_component0")}
                    </Link>
                  ),
                })}
              </Text>
            )}
            <Section className="mb-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${slug}/upgrade`}
              >
                {t("upgrade-my-plan-button")}
              </Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
