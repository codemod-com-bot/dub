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

export default function WorkspaceInvite({
  email = "panic@thedis.co",
  appName = "Dub.co",
  url = "http://localhost:8888/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
  workspaceName = "Acme",
  workspaceUser = "Brendon Urie",
  workspaceUserEmail = "panic@thedis.co",
}: {
  email: string;
  appName: string;
  url: string;
  workspaceName: string;
  workspaceUser: string | null;
  workspaceUserEmail: string | null;
}) {
const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('join-workspace-name-on-app-name', { "workspaceName": workspaceName, "appName": appName })}
      </Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('join-workspace-name-on-app-name-duplicate', { "workspaceName": workspaceName, "appName": appName })}
            </Heading>
            {workspaceUser && workspaceUserEmail ? (
              <Text className="text-sm leading-6 text-black">
                {t('invitation-from-workspace-user', { "component0": {t('invitation-from-workspace-user_component0', { "_workspaceUser_": <>{workspaceUser}</> })}, "component1": {t('invitation-from-workspace-user_component1', { "_workspaceUserEmail_": <>{workspaceUserEmail}</> })}, "component2": {t('invitation-from-workspace-user_component2', { "_workspaceName_": <>{workspaceName}</> })}, "appName": appName })}</Text>
            ) : (
              <Text className="text-sm leading-6 text-black">{t('invitation-to-join-workspace-on-app-name', { "component0": {t('invitation-to-join-workspace-on-app-name_component0', { "_workspaceName_": <>{workspaceName}</> })}, "appName": appName })}
                </Text>
            )}
            <Section className="mb-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >{t('join-workspace-button')}</Link>
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
