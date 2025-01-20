import { ForgotPasswordForm } from "@/ui/auth/forgot-password-form";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const t = useTranslations("partners.dub.co/(auth)/(default)/forgot-password");

  return (
    <div className="mx-auto my-10 w-full max-w-md md:mt-16 lg:mt-20">
      <div className="rounded-lg border border-neutral-200 bg-white p-8 pb-10">
        <h1 className="text-lg font-medium text-neutral-800">
          {t("reset-password-message")}
        </h1>
        <div className="mt-8 text-left">
          <ForgotPasswordForm />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        {t("signup-link-message", {
          component0: (
            <Link
              href="register"
              className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black"
            >
              {t("signup-link-message_component0")}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
