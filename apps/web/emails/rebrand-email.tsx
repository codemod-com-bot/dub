import { DUB_THUMBNAIL, DUB_WORDMARK } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
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

export default function RebrandEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
}: {
  name: string | null;
  email: string;
}) {
  const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t("announcement-rebrand")}</Preview>
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
              {t("rebranding-message")}
            </Heading>
            <Section className="my-8">
              <Img
                src={DUB_THUMBNAIL}
                alt={t("dub-name-mention")}
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              {t("greeting-hey")}
              {name ? ` ${name}` : " there"}
              {t("exclamation-mark")}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("founder-introduction")}
            </Text>
            <Text className="text-sm font-bold leading-6 text-black">
              {t("rebranding-info")}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("learn-more-rebrand", {
                component0: (
                  <Link
                    href="https://dub.co/blog/rebrand"
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("learn-more-rebrand_component0")}
                  </Link>
                ),
              })}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("product-update-emails", {
                component0: (
                  <strong>{t("product-update-emails_component0")}</strong>
                ),
                component1: (
                  <strong>{t("product-update-emails_component1")}</strong>
                ),
                component2: (
                  <strong>{t("product-update-emails_component2")}</strong>
                ),
              })}
            </Text>
            <Hr />
            <Text className="text-sm leading-6 text-black">
              {t("new-features-introduction")}
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              {t("migration-assistants-feature", {
                component0: (
                  <Link
                    href="https://dub.co/blog/migration-assistants"
                    className="font-bold text-blue-600 no-underline"
                  >
                    {t("migration-assistants-feature_component0")}
                  </Link>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              {t("help-center-feature", {
                component0: (
                  <Link
                    href="https://dub.co/help"
                    className="font-bold text-blue-600 no-underline"
                  >
                    {t("help-center-feature_component0")}
                  </Link>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              {t("geo-targeting-feature", {
                component0: (
                  <strong>{t("geo-targeting-feature_component0")}</strong>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              {t("link-comments-feature", {
                component0: (
                  <strong>{t("link-comments-feature_component0")}</strong>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              {t("link-cloaking-feature", {
                component0: (
                  <strong>{t("link-cloaking-feature_component0")}</strong>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              {t("custom-qr-codes-feature", {
                component0: (
                  <strong>{t("custom-qr-codes-feature_component0")}</strong>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              ◆ <strong>{t("custom-social-media-cards")}</strong>
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              ◆ <strong>{t("detailed-link-stats")}</strong>
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              ◆ <strong>{t("link-pagination")}</strong>
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("changelog-update", {
                component0: (
                  <Link
                    href="https://dub.co/changelog"
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("changelog-update_component0")}
                  </Link>
                ),
              })}
            </Text>

            <Text className="text-sm leading-6 text-black">
              {t("questions-feedback-offer")}
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              {t("steven-introduction")}
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
