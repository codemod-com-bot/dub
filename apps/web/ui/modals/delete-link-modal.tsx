import { mutatePrefix } from "@/lib/swr/mutate";
import useWorkspace from "@/lib/swr/use-workspace";
import { LinkProps } from "@/lib/types";
import { Button, LinkLogo, Modal, useMediaQuery } from "@dub/ui";
import { getApexDomain, linkConstructor } from "@dub/utils";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

type DeleteLinkModalProps = {
  showDeleteLinkModal: boolean;
  setShowDeleteLinkModal: Dispatch<SetStateAction<boolean>>;
  props: LinkProps;
};

function DeleteLinkModal(props: DeleteLinkModalProps) {
  return (
    <Modal
      showModal={props.showDeleteLinkModal}
      setShowModal={props.setShowDeleteLinkModal}
    >
      <DeleteLinkModalInner {...props} />
    </Modal>
  );
}

function DeleteLinkModalInner({
  setShowDeleteLinkModal,
  props,
}: DeleteLinkModalProps) {
  const t = useTranslations("../ui/modals");

  const { id } = useWorkspace();
  const [deleting, setDeleting] = useState(false);
  const apexDomain = getApexDomain(props.url);

  const { key, domain } = props;

  const shortlink = useMemo(() => {
    return linkConstructor({
      key,
      domain,
      pretty: true,
    });
  }, [key, domain]);

  const { isMobile } = useMediaQuery();

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 text-center sm:px-16">
        <LinkLogo apexDomain={apexDomain} />
        <h3 className="text-lg font-medium">
          {t("delete-shortlink", { shortlink: shortlink })}
        </h3>
        <p className="text-sm text-gray-500">
          {t("warning-deleting-link-analytics")}
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setDeleting(true);
          fetch(`/api/links/${props.id}?workspaceId=${id}`, {
            method: "DELETE",
          }).then(async (res) => {
            if (res.status === 200) {
              await mutatePrefix("/api/links");
              setShowDeleteLinkModal(false);
              toast.success("Successfully deleted shortlink!");
            } else {
              const { error } = await res.json();
              toast.error(error.message);
            }
            setDeleting(false);
          });
        }}
        className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label htmlFor="verification" className="block text-sm text-gray-700">
            {t("verify-shortlink-input", {
              component0: <span className="font-semibold">{shortlink}</span>,
            })}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="verification"
              id="verification"
              pattern={shortlink}
              required
              autoFocus={!isMobile}
              autoComplete="off"
              className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            />
          </div>
        </div>

        <Button
          variant="danger"
          text={t("confirm-delete")}
          loading={deleting}
        />
      </form>
    </>
  );
}

export function useDeleteLinkModal({ props }: { props?: LinkProps }) {
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false);

  const DeleteLinkModalCallback = useCallback(() => {
    return props ? (
      <DeleteLinkModal
        showDeleteLinkModal={showDeleteLinkModal}
        setShowDeleteLinkModal={setShowDeleteLinkModal}
        props={props}
      />
    ) : null;
  }, [showDeleteLinkModal, setShowDeleteLinkModal]);

  return useMemo(
    () => ({
      setShowDeleteLinkModal,
      DeleteLinkModal: DeleteLinkModalCallback,
    }),
    [setShowDeleteLinkModal, DeleteLinkModalCallback],
  );
}
