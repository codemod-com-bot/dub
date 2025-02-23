import { useTranslations } from "next-intl";
import Image from "next/image";

export function Analytics() {
  const t = useTranslations("../ui/placeholders/feature-graphics");

  return (
    <div
      aria-hidden
      className="size-full select-none [mask-image:linear-gradient(black_60%,transparent)]"
    >
      <div className="relative mx-3.5 h-full overflow-hidden rounded-t-xl border-x border-t border-neutral-200 shadow-[0_20px_20px_0_#00000017]">
        <Image
          src="https://assets.dub.co/home/analytics.png"
          alt={t("analytics")}
          fill
          draggable={false}
          className="object-cover object-left-top"
        />
      </div>
    </div>
  );
}
