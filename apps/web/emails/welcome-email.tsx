import { DUB_THUMBNAIL, DUB_WORDMARK } from "@dub/utils";
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

export default function WelcomeEmail({
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
      <Preview>{t("welcome-to-dub-co")}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t("dub-quote")}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              {t("welcome-to-dub-co-whitespace")}
            </Heading>
            <Section className="my-8">
              <Img
                src={DUB_THUMBNAIL}
                alt={t("dub-quote-repeated")}
                className="max-w-[500px]"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              {t("thanks-for-signing-up")}
              {name && `, ${name}`}
              {t("exclamation-mark")}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("founder-introduction")}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("things-you-can-do")}
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              {t("create-new-workspace-and-add-custom-domain", {
                component0: (
                  <Link
                    href="https://app.dub.co?newWorkspace=true"
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("create-new-workspace-and-add-custom-domain_component0")}
                  </Link>
                ),
                component1: (
                  <Link
                    href="https://dub.co/help/article/how-to-add-custom-domain"
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("create-new-workspace-and-add-custom-domain_component1")}
                  </Link>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              {t("create-first-short-link", {
                component0: (
                  <Link
                    href="https://dub.co/help/article/how-to-create-link"
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("create-first-short-link_component0")}
                  </Link>
                ),
              })}
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              {t("check-out-api-documentation", {
                component0: (
                  <Link
                    href="https://dub.co/api"
                    className="font-medium text-blue-600 no-underline"
                  >
                    {t("check-out-api-documentation_component0")}
                  </Link>
                ),
              })}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("questions-or-feedback")}
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
