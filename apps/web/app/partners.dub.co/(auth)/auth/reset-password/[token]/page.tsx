import { getTranslations } from "next-intl/server";
import { ResetPasswordForm } from "@/ui/auth/reset-password-form";
import EmptyState from "@/ui/shared/empty-state";
import { prisma } from "@dub/prisma";
import { InputPassword } from "@dub/ui";

export const runtime = "nodejs";

interface Props {
  params: {
    token: string;
  };
}

export default async function ResetPasswordPage({ params: { token } }: Props) {
const t = await getTranslations("partners.dub.co/(auth)/auth/reset-password/[token]");

  const validToken = await isValidToken(token);

  if (!validToken) {
    return (
      <div className="my-10 md:mt-16 lg:mt-20">
        <EmptyState
          icon={InputPassword}
          title={t('invalid-reset-token')}
          description={t('password-reset-token-invalid-or-expired')}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 w-full max-w-md md:mt-16 lg:mt-20">
      <div className="rounded-lg border border-neutral-200 bg-white p-8 pb-10">
        <h1 className="text-lg font-medium text-neutral-800">{t('reset-your-password')}</h1>
        <p className="mt-3 text-sm text-gray-500">{t('enter-new-password-for-account')}</p>
        <div className="mt-8 text-left">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}

const isValidToken = async (token: string) => {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      expires: {
        gte: new Date(),
      },
    },
    select: {
      token: true,
    },
  });

  return !!resetToken;
};
