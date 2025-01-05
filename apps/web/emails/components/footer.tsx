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
        <Text className="text-[12px] leading-6 text-gray-500">{t('product-update-emails-info')}<br />{t('unsubscribe-email-notifications', { "component0": <Link
            className="text-gray-700 underline"
            href="https://app.dub.co/account/settings"
          >{t('unsubscribe-email-notifications_component0')}</Link> })}
          
        </Text>
      </Tailwind>
    );
  }

  return (
    <Tailwind>
      <Hr className="mx-0 my-6 w-full border border-gray-200" />
      <Text className="text-[12px] leading-6 text-gray-500">{t('intended-recipients-notice', { "component0": {t('intended-recipients-notice_component0', { "_email_": <>{email}</> })} })}</Text>

      {notificationSettingsUrl && (
        <Text className="text-[12px] leading-6 text-gray-500">{t('adjust-notification-settings', { "component0": <Link
            className="text-gray-700 underline"
            href={notificationSettingsUrl}
          >{t('adjust-notification-settings_component0')}</Link> })}
          
        </Text>
      )}
    </Tailwind>
  );
}
