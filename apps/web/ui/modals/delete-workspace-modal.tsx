import { useTranslation, Trans } from "react-i18next";
import useWorkspace from "@/lib/swr/use-workspace";
import { Button, Logo, Modal, useMediaQuery } from "@dub/ui";
import { cn } from "@dub/utils";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { mutate } from "swr";

function DeleteWorkspaceModal({
  showDeleteWorkspaceModal,
  setShowDeleteWorkspaceModal,
}: {
  showDeleteWorkspaceModal: boolean;
  setShowDeleteWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}) {
const { t } = useTranslation("../ui/modals");

  const { update } = useSession();
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const { id, isOwner } = useWorkspace();

  const [deleting, setDeleting] = useState(false);

  async function deleteWorkspace() {
    return new Promise((resolve, reject) => {
      setDeleting(true);
      fetch(`/api/workspaces/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          await Promise.all([mutate("/api/workspaces"), update()]);
          router.push("/");
          resolve(null);
        } else {
          setDeleting(false);
          const error = await res.text();
          reject(error);
        }
      });
    });
  }

  const { isMobile } = useMediaQuery();

  return (
    <Modal
      showModal={showDeleteWorkspaceModal}
      setShowModal={setShowDeleteWorkspaceModal}
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
        <Logo />
        <h3 className="text-lg font-medium">{t('delete-workspace')}</h3>
        <p className="text-center text-sm text-gray-500">{t('warning-permanently-delete-workspace')}</p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(deleteWorkspace(), {
            loading: "Deleting workspace...",
            success: "Workspace deleted successfully!",
            error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label
            htmlFor="workspace-slug"
            className="block text-sm font-medium text-gray-700"
          ><Trans
i18nKey="enter-workspace-slug"
values={{ _slug_: <>{slug}</> }}
components={{"0": 
            <span className="font-semibold text-black" />}}
/></label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="workspace-slug"
              id="workspace-slug"
              autoFocus={!isMobile}
              autoComplete="off"
              pattern={slug}
              disabled={!isOwner}
              className={cn(
                "block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm",
                {
                  "cursor-not-allowed bg-gray-100": !isOwner,
                },
              )}
            />
          </div>
        </div>

        <div>
          <label htmlFor="verification" className="block text-sm text-gray-700"><Trans
i18nKey="verify-confirm-delete-workspace"
components={{"0": 
            <span className="font-semibold text-black" />}}
/></label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="verification"
              id="verification"
              pattern="confirm delete workspace"
              required
              autoComplete="off"
              disabled={!isOwner}
              className={cn(
                "block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm",
                {
                  "cursor-not-allowed bg-gray-100": !isOwner,
                },
              )}
            />
          </div>
        </div>

        <Button
          text={t('confirm-delete-workspace')}
          variant="danger"
          loading={deleting}
          {...(!isOwner && {
            disabledTooltip: "Only workspace owners can delete a workspace.",
          })}
        />
      </form>
    </Modal>
  );
}

export function useDeleteWorkspaceModal() {
  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] =
    useState(false);

  const DeleteWorkspaceModalCallback = useCallback(() => {
    return (
      <DeleteWorkspaceModal
        showDeleteWorkspaceModal={showDeleteWorkspaceModal}
        setShowDeleteWorkspaceModal={setShowDeleteWorkspaceModal}
      />
    );
  }, [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal]);

  return useMemo(
    () => ({
      setShowDeleteWorkspaceModal,
      DeleteWorkspaceModal: DeleteWorkspaceModalCallback,
    }),
    [setShowDeleteWorkspaceModal, DeleteWorkspaceModalCallback],
  );
}
