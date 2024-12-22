import { useTranslation } from "react-i18next";
import { getDomainViaEdge } from "@/lib/planetscale/get-domain-via-edge";
import { Background, Footer, Nav, NavMobile } from "@dub/ui";
import { CircleHalfDottedClock } from "@dub/ui/icons";
import { constructMetadata } from "@dub/utils";
import { redirect } from "next/navigation";

export const runtime = "edge";

export const metadata = constructMetadata({
  title: "Expired Link – Dub.co",
  description:
    "This link has expired. Please contact the owner of this link to get a new one.",
  noIndex: true,
});

export default async function ExpiredLinkPage({
  params,
}: {
  params: { domain: string };
}) {
const { t } = useTranslation("expired/[domain]");

  const domain = await getDomainViaEdge(params.domain);

  if (domain?.expiredUrl) {
    redirect(domain.expiredUrl);
  }

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <NavMobile />
      <Nav />
      <div className="z-10 mx-2 my-10 flex max-w-md flex-col items-center space-y-5 px-2.5 text-center sm:mx-auto sm:max-w-lg sm:px-0 lg:mb-16">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gray-300 bg-white/80">
          <CircleHalfDottedClock className="size-6 text-gray-500" />
        </div>
        <h1 className="font-display text-5xl font-bold">{t('expired-link')}</h1>
        <p className="text-lg text-gray-600">{t('link-expired-message')}</p>
        <a
          href="https://dub.co/home"
          className="rounded-full bg-gray-800 px-10 py-2 font-medium text-white transition-colors hover:bg-black"
        >{t('create-free-branded-link')}</a>
      </div>
      <Footer />
      <Background />
    </main>
  );
}
