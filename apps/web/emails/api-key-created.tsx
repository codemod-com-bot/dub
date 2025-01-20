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
import { useTranslations } from "next-intl";
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
      <Preview>{t("new-workspace-api-key-created")}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={DUB_WORDMARK}
                height="40"
                alt="Dub.co"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              {t("new-workspace-api-key-created-whitespace")}
            </Heading>
            <Text className="text-sm leading-6 text-black">
              {t("created-api-key-for-workspace", {
                component0: <strong>{workspace.name}</strong>,
                component1: (
                  <strong>
                    {t("created-api-key-for-workspace_component1")}
                    {token.name}
                    {t("created-api-key-for-workspace_component1")}
                  </strong>
                ),
                formatDateNewDateToString: formatDate(new Date().toString()),
              })}
            </Text>
            <Text className="text-sm leading-6 text-black">
              {t("token-type-info", {
                component0: <strong>{token.type}</strong>,
              })}
              {token.permissions}.
            </Text>
            <Section className="mb-8 mt-4 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://app.dub.co/${workspace.slug}/settings/tokens`}
              >
                {t("view-api-keys")}
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              {t("delete-api-key-instructions", {
                component0: (
                  <Link
                    href={`https://app.dub.co/${workspace.slug}/settings/tokens`}
                    className="text-black underline"
                  >
                    <strong>delete this key</strong>
                  </Link>
                ),
              })}
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
