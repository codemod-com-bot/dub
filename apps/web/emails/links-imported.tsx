import { useTranslation, Trans } from "react-i18next";
import { DUB_WORDMARK, linkConstructor, pluralize, timeAgo } from "@dub/utils";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

export default function LinksImported({
  email = "panic@thedis.co",
  provider = "Bitly",
  count = 1020,
  links = [
    {
      domain: "ac.me",
      key: "sales",
      createdAt: new Date("2023-07-16T00:00:00.000Z"),
    },
    {
      domain: "ac.me",
      key: "instagram",
      createdAt: new Date("2023-07-01T00:00:00.000Z"),
    },
    {
      domain: "ac.me",
      key: "facebook",
      createdAt: new Date("2023-06-18T00:00:00.000Z"),
    },
    {
      domain: "ac.me",
      key: "twitter",
      createdAt: new Date("2023-06-01T00:00:00.000Z"),
    },
    {
      domain: "ac.me",
      key: "linkedin",
      createdAt: new Date("2023-05-16T00:00:00.000Z"),
    },
  ],
  workspaceName = "Acme",
  workspaceSlug = "acme",
  domains = ["ac.me"],
}: {
  email: string;
  provider: "Bitly" | "Short.io" | "Rebrandly" | "CSV";
  count: number;
  links: {
    domain: string;
    key: string;
    createdAt: Date;
  }[];
  workspaceName: string;
  workspaceSlug: string;
  domains: string[];
}) {
const { t } = useTranslation("../emails");

  return (
    <Html>
      <Head />
      <Preview>{t('your-provider-links-have-been-imported', { provider })}</Preview>
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
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">{t('your-provider-links-have-been-imported-2', { provider })}</Heading>
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="we-have-successfully-imported-links-from-provider-into-dub-workspace"
values={{ provider, workspaceName }}
components={{"0": 
              <strong />, "1": 
              <Link
                href={`https://app.dub.co/${workspaceSlug}`}
                className="font-medium text-blue-600 no-underline"
               />}}
/>{pluralize("domain", domains.length)}<Trans
i18nKey="domains-joined"
values={{ _domains_join_: <>{domains.join(", ")}</> }}
components={{"0": 
              <strong />}}
/></Text>
            {links.length > 0 && (
              <Section>
                <Row className="pb-2">
                  <Column align="left" className="text-sm text-gray-500">{t('link')}</Column>
                  <Column align="right" className="text-sm text-gray-500">{t('created')}</Column>
                </Row>
                {links.map(({ domain, key, createdAt }, index) => (
                  <div key={index}>
                    <Row>
                      <Column align="left" className="text-sm font-medium">
                        {linkConstructor({ domain, key, pretty: true })}
                      </Column>
                      <Column
                        align="right"
                        className="text-sm text-gray-600"
                        suppressHydrationWarning
                      >
                        {timeAgo(createdAt)}
                      </Column>
                    </Row>
                    {index !== links.length - 1 && (
                      <Hr className="my-2 w-full border border-gray-200" />
                    )}
                  </div>
                ))}
              </Section>
            )}
            {count > 5 && (
              <Section className="my-8 text-center">
                <Link
                  className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                  href={`https://app.dub.co/${workspaceSlug}`}
                >{t('view-more-links')}{Intl.NumberFormat("en-us").format(count - 5)}{t('more-links')}</Link>
              </Section>
            )}
            <Text className="text-sm leading-6 text-black"><Trans
i18nKey="if-you-havent-configured-your-domains"
components={{"0": 
              <Link
                href="https://dub.co/help/article/how-to-add-custom-domain#step-2-configure-your-domain"
                className="font-medium text-blue-600 no-underline"
               />}}
/></Text>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
