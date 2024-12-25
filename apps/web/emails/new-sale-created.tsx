import { useTranslations } from "next-intl";
import { currencyFormatter, DUB_WORDMARK, getPrettyUrl } from "@dub/utils";
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

export default function NewSaleCreated({
  email = "panic@thedis.co",
  partner = {
    id: "pn_OfewI1Faaf5pV8QH3mha8L7S",
    referralLink: "https://refer.dub.co/steven",
  },
  program = {
    id: "prog_d8pl69xXCv4AoHNT281pHQdo",
    name: "Acme",
    logo: DUB_WORDMARK,
  },
  sale = {
    amount: 4900,
    earnings: 490,
  },
}: {
  email: string;
  partner: {
    id: string;
    referralLink: string;
  };
  program: {
    id: string;
    name: string;
    logo: string | null;
  };
  sale: {
    amount: number;
    earnings: number;
  };
}) {
const t = useTranslations("../emails");

  const linkToSale = `https://partners.dub.co/${partner.id}/${program.id}/sales`;

  const earningsInDollars = currencyFormatter(sale.earnings / 100, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const saleAmountInDollars = currencyFormatter(sale.amount / 100, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Html>
      <Head />
      <Preview>{t('you-just-made-a-{earningsInDollars}-sale-via-your-referral-link', { "earningsInDollars": earningsInDollars })}
        {getPrettyUrl(partner.referralLink)}
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="my-8">
              <Img
                src={program.logo || "https://assets.dub.co/logo.png"}
                height="32"
                alt={program.name}
              />
            </Section>

            <Heading className="mx-0 p-0 text-lg font-medium text-black">{t('you-just-made-a-{earningsInDollars}-referral-sale', { "earningsInDollars": earningsInDollars })}</Heading>

            <Text className="text-sm leading-6 text-gray-600">{t('congratulations-someone-made-a-{saleAmountInDollars}-purchase-on-{program.name}-using-your-referral-link', { "component0": {t('congratulations-someone-made-a-{saleAmountInDollars}-purchase-on-{program.name}-using-your-referral-link_component0', { "_saleAmountInDollars_": _saleAmountInDollars_ })}, "component1": {t('congratulations-someone-made-a-{saleAmountInDollars}-purchase-on-{program.name}-using-your-referral-link_component1', { "_program_name_": _program_name_ })}, "component2": {t('congratulations-someone-made-a-{saleAmountInDollars}-purchase-on-{program.name}-using-your-referral-link_component2', { "_getPrettyUrl_partner_referralLink_": _getPrettyUrl_partner_referralLink_ })} })}
              </Text>
            <Text className="text-sm leading-6 text-gray-600">{t('you-received-{earningsInDollars}-in-commission-for-this-sale', { "component0": {t('you-received-{earningsInDollars}-in-commission-for-this-sale_component0', { "_earningsInDollars_": _earningsInDollars_ })} })}
              </Text>

            <Section className="mb-12 mt-8">
              <Link
                className="rounded-md bg-neutral-900 px-4 py-3 text-[12px] font-medium text-white no-underline"
                href={linkToSale}
              >{t('view-sale')}</Link>
            </Section>
            <Footer email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
