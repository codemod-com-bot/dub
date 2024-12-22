"use client";
import { useTranslation, Trans } from "react-i18next";


import {
  RegisterProvider,
  useRegisterContext,
} from "@/ui/auth/register/context";
import { SignUpForm } from "@/ui/auth/register/signup-form";
import { VerifyEmailForm } from "@/ui/auth/register/verify-email-form";
import { truncate } from "@dub/utils";
import Link from "next/link";

export default function RegisterPageClient() {
  return (
    <RegisterProvider>
      <div className="mx-auto my-10 w-full max-w-md md:mt-16 lg:mt-20">
        <RegisterFlow />
      </div>
    </RegisterProvider>
  );
}

function SignUp() {
const { t } = useTranslation("partners.dub.co/(auth)/register");

  return (
    <>
      <div className="rounded-lg border border-neutral-200 bg-white p-8 pb-10">
        <h1 className="text-lg font-medium text-neutral-800">{t('create-a-dub-partner-account')}</h1>
        <div className="mt-8">
          <SignUpForm methods={["email", "google"]} />
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
    </>
  );
}

function Verify() {
const { t } = useTranslation("partners.dub.co/(auth)/register");

  const { email } = useRegisterContext();

  return (
    <>
      <div className="rounded-lg border border-neutral-200 bg-white p-8 pb-10">
        <h1 className="text-lg font-medium text-neutral-800">{t('verify-your-email-address')}</h1>
        <p className="mt-3 text-sm text-gray-500"><Trans
i18nKey="enter-six-digit-verification-code"
values={{ _truncate_email_30_: <>
            {truncate(email, 30)}</> }}
components={{"0": 
          <strong className="font-medium text-gray-600" title={email} />}}
/>
        </p>
        <div className="mt-8">
          <VerifyEmailForm />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500"><Trans
i18nKey="already-have-an-account-sign-in-link-duplicate"
components={{"0": 
        <Link
          href="/login"
          className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black"
         />}}
/>
      </p>
    </>
  );
}

const RegisterFlow = () => {
  const { step } = useRegisterContext();

  if (step === "signup") return <SignUp />;
  if (step === "verify") return <Verify />;
};
