import { FileX2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LinkNotFound() {
  const t = useTranslations("../ui/links");

  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
      <div className="rounded-full bg-gray-100 p-3">
        <FileX2 className="h-6 w-6 text-gray-600" />
      </div>
      <h1 className="my-3 text-xl font-semibold text-gray-700">
        {t("link-not-found")}
      </h1>
      <p className="z-10 max-w-sm text-center text-sm text-gray-600">
        {t("bummer-link-not-exist")}
      </p>
      <img
        src="https://assets.dub.co/misc/not-found.svg"
        alt={t("no-links-yet")}
        width={300}
        height={300}
      />
    </div>
  );
}
