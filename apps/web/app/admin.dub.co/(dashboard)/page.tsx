import { constructMetadata } from "@dub/utils";
import { useTranslations } from "next-intl";
import BanLink from "./components/ban-link";
import ImpersonateUser from "./components/impersonate-user";
import ImpersonateWorkspace from "./components/impersonate-workspace";
import RefreshDomain from "./components/refresh-domain";

export const metadata = constructMetadata({
  title: "Dub Admin",
});

export default function AdminPage() {
  const t = useTranslations("admin.dub.co/(dashboard)");

  return (
    <div className="mx-auto flex w-full max-w-screen-sm flex-col divide-y divide-gray-200 overflow-auto bg-white">
      <div className="flex flex-col space-y-4 px-5 py-10">
        <h2 className="text-xl font-semibold">{t("impersonate-user")}</h2>
        <p className="text-sm text-gray-500">{t("get-login-link-user")}</p>
        <ImpersonateUser />
      </div>
      <div className="flex flex-col space-y-4 px-5 py-10">
        <h2 className="text-xl font-semibold">{t("impersonate-workspace")}</h2>
        <p className="text-sm text-gray-500">
          {t("get-login-link-workspace-owner")}
        </p>
        <ImpersonateWorkspace />
      </div>
      <div className="flex flex-col space-y-4 px-5 py-10">
        <h2 className="text-xl font-semibold">{t("refresh-domain")}</h2>
        <p className="text-sm text-gray-500">
          {t("remove-readd-domain-vercel")}
        </p>
        <RefreshDomain />
      </div>
      <div className="flex flex-col space-y-4 px-5 py-10">
        <h2 className="text-xl font-semibold">{t("ban-link")}</h2>
        <p className="text-sm text-gray-500">{t("ban-dubsh-link")}</p>
        <BanLink />
      </div>
    </div>
  );
}
