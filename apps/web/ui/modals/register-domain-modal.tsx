import { useTranslation } from "react-i18next";
import { Modal, useRouterStuff } from "@dub/ui";
import { useCallback, useMemo, useState } from "react";
import { RegisterDomainForm } from "../domains/register-domain-form";

interface RegisterDomainProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const RegisterDomain = ({ showModal, setShowModal }: RegisterDomainProps) => {
const { t } = useTranslation("../ui/modals");

  const { queryParams } = useRouterStuff();

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      drawerRootProps={{ repositionInputs: false }}
    >
      <h3 className="border-b border-gray-200 px-4 py-4 text-lg font-medium sm:px-6">{t('claim-link-domain')}</h3>
      <div className="scrollbar-hide mt-6 max-h-[calc(100dvh-200px)] overflow-auto overflow-y-scroll">
        <RegisterDomainForm
          variant="modal"
          onSuccess={(domain) => {
            setShowModal(false);
            queryParams({ set: { registered: domain.toLowerCase() } });
          }}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </Modal>
  );
};

export function useRegisterDomainModal() {
  const [showRegisterDomainModal, setShowRegisterDomainModal] = useState(false);

  const RegisterDomainModal = useCallback(() => {
    return (
      <RegisterDomain
        showModal={showRegisterDomainModal}
        setShowModal={setShowRegisterDomainModal}
      />
    );
  }, [showRegisterDomainModal, setShowRegisterDomainModal]);

  return useMemo(
    () => ({ setShowRegisterDomainModal, RegisterDomainModal }),
    [setShowRegisterDomainModal, RegisterDomainModal],
  );
}
