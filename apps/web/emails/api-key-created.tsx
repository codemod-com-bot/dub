import { useTranslation, Trans } from "react-i18next";
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
const { t } = useTranslation("../emails");

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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('new-workspace-api-key-created-whitespace')}</Heading>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="created-new-api-key-for-dub-co-workspace"
values={{ _workspace_name_: <>{workspace.name}</> }}
components={{"0": 
              <strong />, "1": 
              <strong />}}
/>
              {formatDate(new Date().toString())}{t('period-whitespace')}</Text>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="strong-token-type-token"
values={{ _token_type_: <>{token.type}</> }}
components={{"0": <strong />}}
/>
              {token.permissions}{t('period-whitespace-2')}</Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/tokens`}
              >{t('view-api-keys')}</Link>
            </Section>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="if-not-created-api-key-delete-this-key"
values={{ _strong_delete_this_key_strong_: <>
                <strong>delete this key</strong></> }}
components={{"0": 
              <Link
                href={`https://app.dub.co/${workspace.slug}/settings/tokens`}
                className="text-black underline"
               />}}
/></Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
