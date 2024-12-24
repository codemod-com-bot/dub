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
                alt={t('dub-co')}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('new-workspace-api-key-created-fragment')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('created-new-api-key-for-dub-co-workspace', { "component0": {t('created-new-api-key-for-dub-co-workspace_component0', { "_workspace_name_": _workspace_name_ })}, "component1": <strong>{t('created-new-api-key-for-dub-co-workspace_component1')}{token.name}{t('created-new-api-key-for-dub-co-workspace_component1')}</strong> })}
              
              
              {formatDate(new Date().toString())}{t('end-of-sentence')}</Text>
            <Text className="text-sm leading-6 text-black">{t('strong-token-type-token-has', { "component0": {t('strong-token-type-token-has_component0', { "_token_type_": _token_type_ })} })}
              {token.permissions}{t('end-of-sentence-2')}</Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/tokens`}
              >{t('view-api-keys')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black">{t('if-not-created-api-key-delete-from-account', { "component0": {t('if-not-created-api-key-delete-from-account_component0', { "_strong_delete_this_key_strong_": _strong_delete_this_key_strong_ })} })}
              </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
