import { useTranslations } from "next-intl";
import useWorkspace from "@/lib/swr/use-workspace";
import { OAuthAppProps } from "@/lib/types";
import { BlurImage, TokenAvatar } from "@dub/ui";
import { formatDate } from "@dub/utils";
import Link from "next/link";

export default function OAuthAppCard(oAuthApp: OAuthAppProps) {
const t = useTranslations("../ui/oauth-apps");

  const { slug } = useWorkspace();

  return (
    <Link
      href={`/${slug}/settings/oauth-apps/${oAuthApp.id}`}
      className="hover:drop-shadow-card-hover relative rounded-xl border border-gray-200 bg-white px-5 py-4 transition-[filter]"
    >
      <div className="flex items-center gap-x-3">
        <div className="rounded-md border border-gray-200 bg-gradient-to-t from-gray-100 p-2.5">
          {oAuthApp.logo ? (
            <BlurImage
              src={oAuthApp.logo}
              alt={`Logo for ${oAuthApp.name}`}
              className="size-6 rounded-full"
              width={20}
              height={20}
            />
          ) : (
            <TokenAvatar id={oAuthApp.clientId} className="size-6" />
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-700">{oAuthApp.name}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">{t('last-updated', { "component0": {t('last-updated_component0', { "_formatDate_oAuthApp_updatedAt_year_undefined_": _formatDate_oAuthApp_updatedAt_year_undefined_ })} })}
          </div>
        </div>
      </div>
    </Link>
  );
}
