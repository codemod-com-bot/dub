import { NewBackground } from "@/ui/shared/new-background";
import { Wordmark } from "@dub/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("");

  return (
    <>
      <div className="relative z-10 flex h-screen w-screen flex-col items-center justify-center gap-6">
        <Link href="/" className="absolute left-4 top-3">
          <Wordmark className="h-6" />
        </Link>
        <h1 className="font-display bg-gradient-to-r from-black to-gray-600 bg-clip-text text-5xl font-semibold text-transparent">
          404
        </h1>
        <Link
          href="/"
          className="flex h-9 w-fit items-center justify-center rounded-md border border-black bg-black px-4 text-sm text-white hover:bg-gray-800 hover:ring-4 hover:ring-gray-200"
        >
          {t("go-back-home")}
        </Link>
      </div>
      <NewBackground showAnimation />
    </>
  );
}
