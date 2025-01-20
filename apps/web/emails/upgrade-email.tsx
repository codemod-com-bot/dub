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
import { useTranslations } from "next-intl";
import Footer from "./components/footer";

export default function UpgradeEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
  plan = "Business",
}: {
  name: string | null;
  email: string;
  plan: string;
}) {
  const t = useTranslations("../emails");

  const planDetails = getPlanDetails(plan);
  return (
    <Html>
      <Head />
      <Preview>{t("thank-you-upgrading-to-dub-co", { plan: plan })}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="my-8">
              <Img src={DUB_WORDMARK} height="32" alt={t("dub")} />
            </Section>
            <Heading className="mx-0 p-0 text-lg font-medium text-black">
              {t("thank-you-upgrading-to-dub-co-with-new-line", { plan: plan })}
            </Heading>
            <Section className="my-8">
              <Img
                src="https://assets.dub.co/misc/thank-you-thumbnail.jpg"
                alt={t("thank-you-message")}
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              {t("hey-message")}
              {name && ` ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("founder-thank-you-upgrading", {
                component0: (
                  <Link
                    href={planDetails.link}
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("founder-thank-you-upgrading_component0", {
                      plan: plan,
                    })}
                  </Link>
                ),
              })}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("open-source-business-support", {
                component0: (
                  <Link
                    href="https://d.to/github"
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("open-source-business-support_component0")}
                  </Link>
                ),
              })}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("plan-access-details", { plan: plan })}
            </Text>
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
            <Text className="text-sm leading-6 text-black">
              {t("questions-feedback-offer")}
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              {t("steven-from-dub")}
            </Text>
            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
