"use client";
import { useTranslations } from "next-intl";

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
      <RegisterFlow />
    </RegisterProvider>
  );
}

function SignUp() {
  const t = useTranslations("app.dub.co/(auth)/register");

  return (
    <>
      <div className="w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl sm:border sm:shadow-sm">
        <div className="border-b border-neutral-200 bg-white pb-6 pt-8 text-center">
          <h3 className="text-lg font-semibold">{t("get-started-with-dub")}</h3>
        </div>
        <div className="bg-neutral-50 px-4 py-8 sm:px-16">
          <SignUpForm />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-neutral-500">
        {t("already-have-an-account-sign-in", {
          component0: (
            <Link
              href="/login"
              className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black"
            >
              {t("already-have-an-account-sign-in_component0")}
            </Link>
          ),
        })}
      </p>
    </>
  );
}

function Verify() {
  const t = useTranslations("app.dub.co/(auth)/register");

  const { email } = useRegisterContext();

  return (
    <>
      <div className="w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl sm:border sm:shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3 border-b border-neutral-200 bg-white px-4 pb-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">
            {t("verify-your-email-address")}
          </h3>
          <p className="text-sm text-neutral-500">
            {t("enter-verification-code", {
              component0: (
                <strong className="font-medium text-neutral-600" title={email}>
                  {truncate(email, 30)}
                </strong>
              ),
            })}
          </p>
        </div>
        <div className="bg-neutral-50 px-4 py-8 sm:px-16">
          <VerifyEmailForm />
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-neutral-500">
        {t("already-have-an-account-sign-in-duplicate", {
          component0: (
            <Link
              href="/login"
              className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black"
            >
              {t("already-have-an-account-sign-in-duplicate_component0")}
            </Link>
          ),
        })}
      </p>
    </>
  );
}

const RegisterFlow = () => {
  const { step } = useRegisterContext();

  if (step === "signup") return <SignUp />;
  if (step === "verify") return <Verify />;
};
