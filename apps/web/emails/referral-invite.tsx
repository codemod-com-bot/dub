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

export default function ReferralInvite({
  email = "panic@thedis.co",
  appName = "Dub.co",
  url = "https://dub.co",
  workspaceUser = "Brendon Urie",
  workspaceUserEmail = "panic@thedis.co",
}: {
  email: string;
  appName: string;
  url: string;
  workspaceUser: string | null;
  workspaceUserEmail: string | null;
}) {
const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('sign-up-for-app-name', { "appName": appName })}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={appName}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('sign-up-for-app-name-with-whitespace', { "appName": appName })}
            </Heading>
            {workspaceUser && workspaceUserEmail ? (
              <Text className="text-sm leading-6 text-black">
                {t('workspace-user-invitation-email', { "component0": {t('workspace-user-invitation-email_component0', { "_workspaceUser_": <>{workspaceUser}</> })}, "component1": {t('workspace-user-invitation-email_component1', { "_workspaceUserEmail_": <>{workspaceUserEmail}</> })}, "appName": appName })}</Text>
            ) : (
              <Text className="text-sm leading-6 text-black">{t('invitation-to-start-using-app-name', { "appName": appName })}</Text>
            )}
            <Section className="mb-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >{t('learn-more')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('copy-url-to-browser')}</Text>
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
