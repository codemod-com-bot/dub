import { useTranslations } from "next-intl";
import { DUB_WORDMARK } from "@dub/utils";
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

export default function ResetPasswordLink({
  email = "panic@thedis.co",
  url = "http://localhost:8888/auth/reset-password/adaf8468f590e70bb60fe40983321c2719c7bdc694063bd2437c1f8a53f7c90a",
}: {
  email: string;
  url: string;
}) {
const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('reset-password-link')}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('reset-password-link-fragment')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('password-reset-email-notification')}</Text>
            <Text className="text-sm leading-6 text-black">{t('reset-password-button-instruction')}</Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >{t('reset-password-button-text')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('copy-paste-url-instruction')}</Text>
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
