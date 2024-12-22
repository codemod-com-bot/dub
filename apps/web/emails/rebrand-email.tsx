import { useTranslation, Trans } from "react-i18next";
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
import Footer from "./components/footer";

export default function RebrandEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
}: {
  name: string | null;
  email: string;
}) {
const { t } = useTranslation("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('today-we-are-thrilled-to-announce-our-rebrand')}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('dub-sh-is-rebranding-to-dub-co')}</Heading>
            <Section className="my-8">
              <Img src={DUB_THUMBNAIL} alt={t('dub')} className="max-w-[500px]" />
            </Section>
            <Text className="text-sm leading-6 text-black">{t('hey')}{name ? ` ${name}` : " there"}{t('exclamation-mark')}</Text>
            <Text className="text-sm leading-6 text-black">{t('my-name-is-steven-and-im-the-founder-of-dub')}</Text>
            <Text className="text-sm font-bold leading-6 text-black">{t('dub-sh-is-rebranding-to-dub-co-2')}</Text>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="learn-more-about-the-rebrand-and-whats-changing"
components={{"0": 
              <Link
                href="https://dub.co/blog/rebrand"
                className="font-medium text-blue-600 no-underline"
               />}}
/></Text>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="moving-forward-product-update-emails-from-ship-dub-co"
components={{"0": 
              <strong />, "1": 
              <strong />, "2": 
              <strong />}}
/></Text>
            <Hr />
            <Text className="text-sm leading-6 text-black">{t('along-with-the-rebrand-multitude-of-new-features')}</Text>
            <Text className="ml-1 text-sm leading-6 text-black"><Trans
i18nKey="migration-assistants-for-bitly-and-short-io"
components={{"0": 
              <Link
                href="https://dub.co/blog/migration-assistants"
                className="font-bold text-blue-600 no-underline"
               />}}
/></Text>
            <Text className="ml-1 text-sm leading-6 text-black"><Trans
i18nKey="dub-help-center-one-stop-shop-for-all-your-dub-questions"
components={{"0": 
              <Link
                href="https://dub.co/help"
                className="font-bold text-blue-600 no-underline"
               />}}
/></Text>
            <Text className="ml-1 text-sm leading-6 text-black"><Trans
i18nKey="geo-targeting-redirect-visitors-based-on-location"
components={{"0": <strong />}}
/></Text>
            <Text className="ml-1 text-sm leading-6 text-black"><Trans
i18nKey="link-comments-leave-comments-on-your-links"
components={{"0": <strong />}}
/></Text>
            <Text className="ml-1 text-sm leading-6 text-black"><Trans
i18nKey="link-cloaking-mask-your-destination-url"
components={{"0": <strong />}}
/></Text>
            <Text className="ml-1 text-sm leading-6 text-black"><Trans
i18nKey="custom-qr-codes-available-on-the-pro-plan"
components={{"0": <strong />}}
/></Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              ◆ <strong>{t('custom-social-media-cards')}</strong>
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              ◆ <strong>{t('detailed-link-stats')}</strong>
            </Text>
            <Text className="ml-1 text-sm leading-6 text-black">
              ◆ <strong>{t('link-pagination')}</strong>
            </Text>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="check-out-our-changelog-to-see-whats-new-on-dub"
components={{"0": 
              <Link
                href="https://dub.co/changelog"
                className="font-medium text-blue-600 no-underline"
               />}}
/></Text>

            <Text className="text-sm leading-6 text-black">{t('let-me-know-if-you-have-any-questions-or-feedback')}</Text>
            <Text className="text-sm font-light leading-6 text-gray-400">{t('steven-from-dub')}</Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
