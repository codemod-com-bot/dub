import LoginForm from "@/ui/auth/login/login-form";
import { AuthLayout } from "@/ui/layout/auth-layout";
import { APP_DOMAIN, constructMetadata } from "@dub/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const metadata = constructMetadata({
  title: `Sign in to ${process.env.NEXT_PUBLIC_APP_NAME}`,
  canonicalUrl: `${APP_DOMAIN}/login`,
});

export default function LoginPage() {
  const t = useTranslations("app.dub.co/(auth)/login");

  return (
    <AuthLayout>
      <div className="w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-sm">
        <div className="border-b border-gray-200 bg-white pb-6 pt-8 text-center">
          <h3 className="text-lg font-semibold">
            {t("sign-in-to-your-dub-account")}
          </h3>
        </div>
        <div className="bg-gray-50 px-4 py-8 sm:px-16">
          <LoginForm />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        {t("dont-have-an-account-sign-up-link", {
          component0: (
            <Link
              href="register"
              className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black"
            >
              {t("dont-have-an-account-sign-up-link_component0")}
            </Link>
          ),
        })}
      </p>
    </AuthLayout>
  );
}
