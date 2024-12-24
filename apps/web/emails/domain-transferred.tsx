import { useTranslations } from "next-intl";
import { Project } from "@dub/prisma/client";
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

export default function DomainTransferred({
  email = "panic@thedis.co",
  domain = "dub.sh",
  newWorkspace = { name: "Dub", slug: "dub" },
  linksCount = 50,
}: {
  email: string;
  domain: string;
  newWorkspace: Pick<Project, "name" | "slug">;
  linksCount: number;
}) {
const t = useTranslations("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('domain-transferred')}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('domain-transferred-newline')}</Heading>
            <Text className="text-sm leading-6 text-black">{t('your-domain-code', { "component0": {t('your-domain-code_component0', { "_domain_": _domain_ })} })}
              {linksCount > 0 && (
                <>{t('links-count', { "linksCount": linksCount })}</>
              )}{t('domain-transferred-workspace-link', { "component0": <Link
                href={`https://app.dub.co/${newWorkspace.slug}/settings/domains`}
                className="font-medium text-blue-600 no-underline"
              >
                {newWorkspace.name}{t('domain-transferred-workspace-link_component0')}</Link> })}
              
            </Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
