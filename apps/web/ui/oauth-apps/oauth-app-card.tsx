import { useTranslation, Trans } from "react-i18next";
import useWorkspace from "@/lib/swr/use-workspace";
import { OAuthAppProps } from "@/lib/types";
import { BlurImage, TokenAvatar } from "@dub/ui";
import { formatDate } from "@dub/utils";
import Link from "next/link";

export default function OAuthAppCard(oAuthApp: OAuthAppProps) {
const { t } = useTranslation("../ui/oauth-apps");

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
          <div className="flex items-center gap-1 text-sm text-gray-500"><Trans
i18nKey="last-updated"
values={{ _formatDate_oAuthApp_updatedAt_year_undefined_: <>
              {formatDate(oAuthApp.updatedAt, { year: undefined })}</> }}
components={{"0": <span className="font-medium text-gray-700" />}}
/>
          </div>
        </div>
      </div>
    </Link>
  );
}
