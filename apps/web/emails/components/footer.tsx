import { useTranslations } from "next-intl";
import { Hr, Link, Tailwind, Text } from "@react-email/components";

export default function Footer({
  email,
  marketing,
  notificationSettingsUrl,
}: {
  email: string;
  marketing?: boolean;
  notificationSettingsUrl?: string;
}) {
const t = useTranslations("../emails/components");

  if (marketing) {
    return (
      <Tailwind>
        <Hr className="mx-0 my-6 w-full border border-gray-200" />
        <Text className="text-[12px] leading-6 text-gray-500">{t('we-send-out-product-update-emails-once-a-month-no-spam-no-nonsense')}<br />{t('dont-want-to-get-these-emails-unsubscribe-here', { "component0": <Link
            className="text-gray-700 underline"
            href="https://app.dub.co/account/settings"
          >{t('dont-want-to-get-these-emails-unsubscribe-here_component0')}</Link> })}
          
        </Text>
      </Tailwind>
    );
  }

  return (
    <Tailwind>
      <Hr className="mx-0 my-6 w-full border border-gray-200" />
      <Text className="text-[12px] leading-6 text-gray-500">{t('this-email-was-intended-for-email-ignore-if-not-expected', { "component0": {t('this-email-was-intended-for-email-ignore-if-not-expected_component0', { "_email_": _email_ })} })}</Text>

      {notificationSettingsUrl && (
        <Text className="text-[12px] leading-6 text-gray-500">{t('dont-want-to-get-these-emails-adjust-your-notification-settings', { "component0": <Link
            className="text-gray-700 underline"
            href={notificationSettingsUrl}
          >{t('dont-want-to-get-these-emails-adjust-your-notification-settings_component0')}</Link> })}
          
        </Text>
      )}
    </Tailwind>
  );
}
