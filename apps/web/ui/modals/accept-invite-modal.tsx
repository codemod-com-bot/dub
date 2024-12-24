import { useTranslations } from "next-intl";
import useWorkspace from "@/lib/swr/use-workspace";
import { Button, Logo, Modal } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import posthog from "posthog-js";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { mutate } from "swr";

function AcceptInviteModal({
  showAcceptInviteModal,
  setShowAcceptInviteModal,
}: {
  showAcceptInviteModal: boolean;
  setShowAcceptInviteModal: Dispatch<SetStateAction<boolean>>;
}) {
const t = useTranslations("../ui/modals");

  const { slug } = useParams() as { slug: string };
  const [accepting, setAccepting] = useState(false);
  const { error } = useWorkspace();
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Modal
      showModal={showAcceptInviteModal}
      setShowModal={setShowAcceptInviteModal}
      preventDefaultClose
    >
      {error?.status === 409 ? (
        <>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
            <Logo />
            <h3 className="text-lg font-medium">{t('workspace-invitation')}</h3>
            <p className="text-center text-sm text-gray-500">{t('youve-been-invited-to-join-and-collaborate-on-the-workspace-on', { "component0": {t('youve-been-invited-to-join-and-collaborate-on-the-workspace-on_component0', { "_slug_": _slug_ })} })}
              {process.env.NEXT_PUBLIC_APP_NAME}
            </p>
          </div>
          <div className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:px-16">
            <Button
              onClick={() => {
                setAccepting(true);
                fetch(`/api/workspaces/${slug}/invites/accept`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                }).then(async () => {
                  if (session?.user) {
                    posthog.identify(session.user["id"], {
                      email: session.user.email,
                      name: session.user.name,
                    });
                  }
                  posthog.capture("accepted_workspace_invite", {
                    workspace: slug,
                  });
                  await Promise.all([
                    mutate("/api/workspaces"),
                    mutate(`/api/workspaces/${slug}`),
                  ]);
                  router.replace(`/${slug}`);
                  setShowAcceptInviteModal(false);
                  toast.success("You now are a part of this workspace!");
                });
              }}
              loading={accepting}
              text={t('accept-invite')}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
            <Logo />
            <h3 className="text-lg font-medium">{t('workspace-invitation-expired')}</h3>
            <p className="text-center text-sm text-gray-500">{t('this-invite-has-expired-or-is-no-longer-valid')}</p>
          </div>
          <div className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:px-16">
            <Button
              text={t('back-to-dashboard')}
              onClick={() => {
                router.push("/");
                setShowAcceptInviteModal(false);
              }}
            />
          </div>
        </>
      )}
    </Modal>
  );
}

export function useAcceptInviteModal() {
  const [showAcceptInviteModal, setShowAcceptInviteModal] = useState(false);

  const AcceptInviteModalCallback = useCallback(() => {
    return (
      <AcceptInviteModal
        showAcceptInviteModal={showAcceptInviteModal}
        setShowAcceptInviteModal={setShowAcceptInviteModal}
      />
    );
  }, [showAcceptInviteModal, setShowAcceptInviteModal]);

  return useMemo(
    () => ({
      setShowAcceptInviteModal,
      AcceptInviteModal: AcceptInviteModalCallback,
    }),
    [setShowAcceptInviteModal, AcceptInviteModalCallback],
  );
}
