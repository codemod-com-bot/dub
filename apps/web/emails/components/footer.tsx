import { Hr, Link, Tailwind, Text } from "@react-email/components";
import { useTranslations } from "next-intl";

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
        <Text className="text-[12px] leading-6 text-gray-500">
          {t("product-update-email-notice", {
            component0: (
              <Link
                className="text-gray-700 underline"
                href="https://app.dub.co/account/settings"
              >
                {t("product-update-email-notice_component0")}
              </Link>
            ),
          })}
        </Text>
        <Text className="text-[12px] text-gray-500">
          {t("company-name")}
          <br />
          {t("company-address-line-1")}
          <br />
          {t("company-address-line-2")}
        </Text>
      </Tailwind>
    );
  }

  return (
    <Tailwind>
      <Hr className="mx-0 my-6 w-full border border-gray-200" />
      <Text className="text-[12px] leading-6 text-gray-500">
        {t("email-intended-recipient-notice", {
          component0: <span className="text-black">{email}</span>,
        })}
      </Text>

      {notificationSettingsUrl && (
        <Text className="text-[12px] leading-6 text-gray-500">
          {t("adjust-notification-settings-link", {
            component0: (
              <Link
                className="text-gray-700 underline"
                href={notificationSettingsUrl}
              >
                {t("adjust-notification-settings-link_component0")}
              </Link>
            ),
          })}
        </Text>
      )}
      <Text className="text-[12px] text-gray-500">
        {t("company-name-repeated")}
        <br />
        {t("company-address-line-1-repeated")}
        <br />
        {t("company-address-line-2-repeated")}
      </Text>
    </Tailwind>
  );
}
