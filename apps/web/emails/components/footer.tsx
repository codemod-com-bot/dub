import { useTranslation, Trans } from "react-i18next";
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
const { t } = useTranslation("../emails/components");

  if (marketing) {
    return (
      <Tailwind>
        <Hr className="mx-0 my-6 w-full border border-gray-200" />
        <Text className="text-[12px] leading-6 text-gray-500">{t('we-send-out-product-update-emails-once-a-month-no-spam-no-nonsense')}<br /><Trans
i18nKey="dont-want-to-get-these-emails-unsubscribe-here"
components={{"0": 
          <Link
            className="text-gray-700 underline"
            href="https://app.dub.co/account/settings"
           />}}
/>
        </Text>
      </Tailwind>
    );
  }

  return (
    <Tailwind>
      <Hr className="mx-0 my-6 w-full border border-gray-200" />
      <Text className="text-[12px] leading-6 text-gray-500"><Trans
i18nKey="this-email-was-intended-for-email-if-you-were-not-expecting-this-email"
values={{ _email_: <>{email}</> }}
components={{"0": <span className="text-black" />}}
/></Text>

      {notificationSettingsUrl && (
        <Text className="text-[12px] leading-6 text-gray-500"><Trans
i18nKey="dont-want-to-get-these-emails-adjust-your-notification-settings"
components={{"0": 
          <Link
            className="text-gray-700 underline"
            href={notificationSettingsUrl}
           />}}
/>
        </Text>
      )}
    </Tailwind>
  );
}
