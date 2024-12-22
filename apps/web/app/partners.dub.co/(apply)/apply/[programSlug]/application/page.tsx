import { useTranslation } from "react-i18next";
import { getProgram } from "@/lib/fetchers/get-program";
import { notFound } from "next/navigation";
import { CSSProperties } from "react";
import { DetailsGrid } from "../details-grid";
import { Header } from "../header";
import { ProgramApplicationForm } from "./form";

export default async function ApplicationPage({
  params: { programSlug },
}: {
  params: { programSlug: string };
}) {
const { t } = useTranslation("partners.dub.co/(apply)/apply/[programSlug]/application");

  const program = await getProgram({ slug: programSlug });

  if (!program) {
    notFound();
  }

  return (
    <div
      className="relative"
      style={
        {
          "--brand": program.brandColor || "#000000",
          "--brand-ring": "rgb(from var(--brand) r g b / 0.2)",
        } as CSSProperties
      }
    >
      <Header
        program={{
          logo: program.logo,
          wordmark: program.wordmark,
        }}
        slug={programSlug}
        showApply={false}
      />
      <div className="p-6">
        {/* Hero section */}
        <div className="grid grid-cols-1 gap-5 sm:pt-20">
          <p className="font-mono text-xs font-medium uppercase text-[var(--brand)]">{t('affiliate-program')}</p>
          <h1 className="text-4xl font-semibold">{program.name}{t('application')}</h1>
          <p className="text-base text-neutral-700">{t('submit-your-application-to-join-the-affiliate-program')}</p>
        </div>

        {/* Program details grid */}
        <DetailsGrid program={program} className="mt-10" />

        {/* Application form */}
        <div className="mt-10">
          <ProgramApplicationForm
            program={{ id: program.id, name: program.name, slug: program.slug }}
          />
        </div>
      </div>
    </div>
  );
}
