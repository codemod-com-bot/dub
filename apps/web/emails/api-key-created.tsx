import { useTranslations } from "next-intl";
import { DUB_WORDMARK, formatDate } from "@dub/utils";
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

export default function APIKeyCreated({
  email = "panic@thedis.co",
  workspace = {
    name: "Acme, Inc",
    slug: "acme",
  },
  token = {
    name: "Acme API Key",
    type: "All access",
    permissions: "full access to all resources",
  },
}: {
  email: string;
  workspace: {
    name: string;
    slug: string;
  };
  token: {
    name: string;
    type: string;
    permissions: string;
  };
}) {
const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('new-workspace-api-key-created')}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt={t('dub-co-name')}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('new-workspace-api-key-created-whitespace')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('api-key-created-for-workspace', { "component0": {t('api-key-created-for-workspace_component0', { "_workspace_name_": <>{workspace.name}</> })}, "component1": <strong>{t('api-key-created-for-workspace_component1', { "token_name": token.name })}</strong> })}
              
              
              {formatDate(new Date().toString())}{t('end-of-sentence')}</Text>
            <Text className="text-sm leading-6 text-black">{t('token-type-and-permissions-info', { "component0": {t('token-type-and-permissions-info_component0', { "_token_type_": <>{token.type}</> })}, "token_permissions": token.permissions })}
              </Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/tokens`}
              >{t('view-api-keys-button')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('delete-api-key-warning', { "component0": {t('delete-api-key-warning_component0', { "_strong_delete_this_key_strong_": <><strong>delete this key</strong></> })} })}
              </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
