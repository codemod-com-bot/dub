import { getLinkViaEdge } from "@/lib/planetscale";
import {
  Background,
  Footer,
  LinkPreview,
  LinkPreviewPlaceholder,
  Nav,
  NavMobile,
} from "@dub/ui";
import {
  GOOGLE_FAVICON_URL,
  constructMetadata,
  getApexDomain,
} from "@dub/utils";
import { unescape } from "html-escaper";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LinkInspectorCard from "./card";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; key: string };
}) {
  const domain = params.domain;
  const key = decodeURIComponent(params.key).slice(0, -1);

  const data = await getLinkViaEdge(domain, key);

  if (!data) {
    return;
  }

  const apexDomain = getApexDomain(data.url);

  return constructMetadata({
    title: unescape(data.title || ""),
    description: unescape(data.description || ""),
    image: data.image,
    icons: `${GOOGLE_FAVICON_URL}${apexDomain}`,
    noIndex: true,
  });
}

export default async function InspectPage({
  params,
}: {
  params: { domain: string; key: string };
}) {
  const t = await getTranslations("inspect/[domain]/[key]");

  const domain = params.domain;
  const key = decodeURIComponent(params.key).slice(0, -1);

  const data = await getLinkViaEdge(domain, key);

  // if the link doesn't exist
  if (!data) {
    notFound();
  }

  return (
    <>
      <main className="flex min-h-screen flex-col justify-between">
        <NavMobile />
        <Nav />
        <div className="z-10 mx-2 my-10 flex max-w-md flex-col space-y-5 px-2.5 text-center sm:mx-auto sm:max-w-lg sm:px-0 lg:mb-16">
          <h1 className="font-display text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
            {t("link-inspector")}
          </h1>
          <h2 className="text-lg text-gray-600 sm:text-xl">
            {t("inspect-short-link-description")}
          </h2>

          <LinkInspectorCard domain={domain} _key={key} url={data.url} />
          <Suspense fallback={<LinkPreviewPlaceholder />}>
            <LinkPreview defaultUrl={data.url} />
          </Suspense>
          <a
            href="https://dub.co/tools/inspector"
            rel="noreferrer"
            target="_blank"
            className="mx-auto mt-2 flex items-center justify-center space-x-2 text-sm text-gray-500 transition-all hover:text-black"
          >
            {t("inspect-another-short-link")}
          </a>
        </div>
        <Footer />
        <Background />
      </main>
    </>
  );
}
