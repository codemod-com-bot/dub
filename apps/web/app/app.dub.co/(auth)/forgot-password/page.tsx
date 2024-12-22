import { useTranslation, Trans } from "react-i18next";
import { ForgotPasswordForm } from "@/ui/auth/forgot-password-form";
import { AuthLayout } from "@/ui/layout/auth-layout";
import { constructMetadata } from "@dub/utils";
import Link from "next/link";

export const metadata = constructMetadata({
  title: `Forgot Password for ${process.env.NEXT_PUBLIC_APP_NAME}`,
});

export default function ForgotPasswordPage() {
const { t } = useTranslation("app.dub.co/(auth)/forgot-password");

  return (
    <AuthLayout>
      <div className="w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">{t('reset-your-password')}</h3>
        </div>

        <div className="bg-gray-50 px-4 py-8 sm:px-16">
          <ForgotPasswordForm />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500"><Trans
i18nKey="already-have-an-account-sign-in-link"
components={{"0": 
        <Link
          href="/login"
          className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black"
         />}}
/>
      </p>
    </AuthLayout>
  );
}
