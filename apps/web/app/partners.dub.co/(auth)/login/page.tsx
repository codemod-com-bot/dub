import LoginForm from "@/ui/auth/login/login-form";
import { ClientOnly } from "@dub/ui";
import { PARTNERS_DOMAIN } from "@dub/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LoginPage() {
  const t = useTranslations("partners.dub.co/(auth)/login");

  return (
    <div className="mx-auto my-10 w-full max-w-md md:mt-16 lg:mt-20">
      <div className="rounded-lg border border-neutral-200 bg-white p-8 pb-10">
        <h1 className="text-lg font-medium text-neutral-800">
          {t("sign-in-to-your-dub-partner-account")}
        </h1>
        <div className="mt-8">
          <ClientOnly>
            <LoginForm
              methods={["email", "password", "google"]}
              // TODO: This is a temp fix, we should either redirect to "/" or "?next="
              redirectTo={PARTNERS_DOMAIN}
            />
          </ClientOnly>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        {t("dont-have-an-account-sign-up", {
          component0: (
            <Link
              href="register"
              className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black"
            >
              {t("dont-have-an-account-sign-up_component0")}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
