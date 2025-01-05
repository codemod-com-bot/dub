import { DUB_WORDMARK } from "@dub/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { useTranslations } from "next-intl";
import Footer from "./components/footer";

export default function VerifyEmail({
  email = "panic@thedis.co",
  code = "123456",
}: {
  email: string;
  code: string;
}) {
  const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t("your-dub-co-verification-code")}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t("dub-identifier")}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              {t("confirm-email-address-prompt")}
            </Heading>
            <Text className="mx-auto text-sm leading-6">
              {t("enter-code-on-verify-page")}
            </Text>
            <Section className="my-8">
              <div className="mx-auto w-fit rounded-xl px-6 py-3 text-center font-mono text-2xl font-semibold tracking-[0.25em]">
                {code}
              </div>
            </Section>
            <Text className="text-sm leading-6 text-black">
              {t("code-expiration-notice")}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
