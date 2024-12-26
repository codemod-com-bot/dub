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
import { useTranslations } from "next-intl";
import Footer from "./components/footer";

export default function PartnerInvite({
  email = "panic@thedis.co",
  appName = "Dub.co",
  program = {
    name: "Acme",
    logo: DUB_WORDMARK,
  },
}: {
  email: string;
  appName: string;
  program: {
    name: string;
    logo: string | null;
  };
}) {
  const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>
        {t("sign-up-for-{program.name}", { program_name: program_name })}
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="my-8">
              <Img
                src={program.logo || "https://assets.dub.co/logo.png"}
                height="32"
                alt={appName}
              />
            </Section>

            <Heading className="mx-0 p-0 text-lg font-medium text-black">
              {t("{program.name}-invited-you-to-join-dub-partners", {
                program_name: program_name,
              })}
            </Heading>

            <Text className="text-sm leading-6 text-gray-600">
              {t(
                "{program.name}-uses-dub-partners-to-power-their-partnership-programs-and-wants-to-partner-with-great-people-like-yourself",
                { program_name: program_name },
              )}
            </Text>

            <Section className="mb-12 mt-8">
              <Link
                className="rounded-md bg-neutral-900 px-4 py-3 text-[12px] font-medium text-white no-underline"
                href="https://partners.dub.co"
              >
                {t("accept-invite")}
              </Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
