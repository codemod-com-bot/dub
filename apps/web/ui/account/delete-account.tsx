"use client";
import { useTranslation } from "react-i18next";

import { useDeleteAccountModal } from "@/ui/modals/delete-account-modal";
import { Button } from "@dub/ui";

export default function DeleteAccountSection() {
const { t } = useTranslation("../ui/account");

  const { setShowDeleteAccountModal, DeleteAccountModal } =
    useDeleteAccountModal();

  return (
    <div className="rounded-lg border border-red-600 bg-white">
      <DeleteAccountModal />
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">{t('delete-account')}</h2>
        <p className="text-sm text-gray-500">{t('permanently-delete-your')}{process.env.NEXT_PUBLIC_APP_NAME}{t('account-all-of-your-workspaces-links-and-their-respective-stats-this-action-cannot-be-undone-please-proceed-with-caution')}</p>
      </div>
      <div className="border-b border-red-600" />

      <div className="flex items-center justify-end p-3 sm:px-10">
        <div>
          <Button
            text={t('delete-account-quote')}
            variant="danger"
            onClick={() => setShowDeleteAccountModal(true)}
          />
        </div>
      </div>
    </div>
  );
}
