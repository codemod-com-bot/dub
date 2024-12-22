"use client";
import { useTranslation } from "react-i18next";


import useSAML from "@/lib/swr/use-saml";
import useSCIM from "@/lib/swr/use-scim";
import useWorkspace from "@/lib/swr/use-workspace";
import { useRemoveSAMLModal } from "@/ui/modals/remove-saml-modal";
import { useRemoveSCIMModal } from "@/ui/modals/remove-scim-modal";
import { useSAMLModal } from "@/ui/modals/saml-modal";
import { useSCIMModal } from "@/ui/modals/scim-modal";
import { ThreeDots } from "@/ui/shared/icons";
import { Button, IconMenu, Popover, TooltipContent } from "@dub/ui";
import { SAML_PROVIDERS } from "@dub/utils";
import { FolderSync, Lock, ShieldOff } from "lucide-react";
import { useMemo, useState } from "react";

export default function WorkspaceSecurityClient() {
  return (
    <>
      <SAMLSection />
      <SCIMSection />
    </>
  );
}

const SAMLSection = () => {
const { t } = useTranslation("app.dub.co/(dashboard)/[slug]/settings/security");

  const { plan } = useWorkspace();
  const { SAMLModal, setShowSAMLModal } = useSAMLModal();
  const { RemoveSAMLModal, setShowRemoveSAMLModal } = useRemoveSAMLModal();
  const { provider, configured, loading } = useSAML();

  const data = useMemo(() => {
    if (loading) {
      return {
        logo: null,
        title: null,
        description: null,
      };
    } else if (configured) {
      return {
        logo: (
          <img
            src={SAML_PROVIDERS.find((p) => p.name === provider)!.logo}
            alt={provider + " logo"}
            className="h-8 w-8"
          />
        ),
        title: `${provider} SAML`,
        description: "SAML SSO is configured for your workspace.",
      };
    } else
      return {
        status: "unconfigured",
        logo: (
          <div className="rounded-full border border-gray-200 p-2">
            <Lock className="h-4 w-4 text-gray-600" />
          </div>
        ),
        title: "SAML",
        description: "Choose an identity provider to get started.",
      };
  }, [provider, configured, loading]);

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <>
      {configured ? <RemoveSAMLModal /> : <SAMLModal />}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="relative flex flex-col space-y-6 p-5 sm:p-10">
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-medium">{t('saml-single-sign-on')}</h2>
            <p className="text-sm text-gray-500">{t('set-up-saml-single-sign-on-sso-to-allow-your-team-to-sign-in-to')}
              {process.env.NEXT_PUBLIC_APP_NAME}{t('with-your-identity-provider')}</p>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-md border border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-4">
              {data.logo || (
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-100" />
              )}
              <div className="flex flex-col">
                {data.title ? (
                  <h3 className="font-medium">{data.title}</h3>
                ) : (
                  <div className="h-5 w-20 animate-pulse rounded-md bg-gray-100" />
                )}
                {data.description ? (
                  <p className="text-sm text-gray-500">{data.description}</p>
                ) : (
                  <div className="mt-2 h-4 w-40 animate-pulse rounded-md bg-gray-100" />
                )}
              </div>
            </div>
            <div>
              {loading ? (
                <div className="h-9 w-24 animate-pulse rounded-md bg-gray-100" />
              ) : configured ? (
                <Popover
                  content={
                    <div className="grid w-full gap-1 p-2 sm:w-48">
                      <button
                        onClick={() => {
                          setShowRemoveSAMLModal(true);
                          setOpenPopover(false);
                        }}
                        className="rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
                      >
                        <IconMenu
                          text={t('remove')}
                          icon={<ShieldOff className="h-4 w-4" />}
                        />
                      </button>
                    </div>
                  }
                  align="end"
                  openPopover={openPopover}
                  setOpenPopover={setOpenPopover}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenPopover(!openPopover);
                    }}
                    className="rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
                  >
                    <span className="sr-only">{t('edit')}</span>
                    <ThreeDots className="h-5 w-5 text-gray-500" />
                  </button>
                </Popover>
              ) : (
                <Button
                  text={t('configure')}
                  disabled={plan !== "enterprise"}
                  {...(plan !== "enterprise" && {
                    disabledTooltip: (
                      <TooltipContent
                        title={t('saml-sso-is-only-available-on-enterprise-plans-upgrade-to-get-started')}
                        cta="Contact sales"
                        href="https://dub.co/enterprise"
                        target="_blank"
                      />
                    ),
                  })}
                  onClick={() => setShowSAMLModal(true)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-gray-50 px-3 py-5 sm:px-10">
          <a
            href="https://dub.co/help/category/saml-sso"
            target="_blank"
            className="text-sm text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-700"
          >{t('learn-more-about-saml-sso')}</a>
        </div>
      </div>
    </>
  );
};

const SCIMSection = () => {
const { t } = useTranslation("app.dub.co/(dashboard)/[slug]/settings/security");

  const { plan } = useWorkspace();
  const { SCIMModal, setShowSCIMModal } = useSCIMModal();
  const { RemoveSCIMModal, setShowRemoveSCIMModal } = useRemoveSCIMModal();

  const { provider, configured, loading } = useSCIM();

  const data = useMemo(() => {
    if (loading) {
      return {
        logo: null,
        title: null,
        description: null,
      };
    } else if (configured) {
      return {
        logo: (
          <img
            src={SAML_PROVIDERS.find((p) => p.scim === provider)!.logo}
            alt={`${provider} logo`}
            className="h-8 w-8"
          />
        ),
        title: `${SAML_PROVIDERS.find((p) => p.scim === provider)!.name} SCIM`,
        description: "SCIM directory sync is configured for your workspace.",
      };
    } else
      return {
        logo: (
          <div className="rounded-full border border-gray-200 p-2">
            <FolderSync className="h-4 w-4 text-gray-600" />
          </div>
        ),
        title: "SCIM",
        description: "Choose an identity provider to get started.",
      };
  }, [provider, configured, loading]);

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <>
      <SCIMModal />
      {configured && <RemoveSCIMModal />}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="relative flex flex-col space-y-6 p-5 sm:p-10">
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-medium">{t('directory-sync')}</h2>
            <p className="text-sm text-gray-500">{t('automatically-provision-and-deprovision-users-from-your-identity-provider')}</p>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-md border border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-4">
              {data.logo || (
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-100" />
              )}
              <div className="flex flex-col">
                {data.title ? (
                  <h3 className="font-medium">{data.title}</h3>
                ) : (
                  <div className="h-5 w-20 animate-pulse rounded-md bg-gray-100" />
                )}
                {data.description ? (
                  <p className="text-sm text-gray-500">{data.description}</p>
                ) : (
                  <div className="mt-2 h-4 w-40 animate-pulse rounded-md bg-gray-100" />
                )}
              </div>
            </div>
            <div>
              {loading ? (
                <div className="h-9 w-24 animate-pulse rounded-md bg-gray-100" />
              ) : configured ? (
                <Popover
                  content={
                    <div className="grid w-full gap-1 p-2 sm:w-48">
                      <button
                        onClick={() => {
                          setShowSCIMModal(true);
                          setOpenPopover(false);
                        }}
                        className="rounded-md p-2 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                      >
                        <IconMenu
                          text={t('view-configuration')}
                          icon={<FolderSync className="h-4 w-4" />}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setShowRemoveSCIMModal(true);
                          setOpenPopover(false);
                        }}
                        className="rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
                      >
                        <IconMenu
                          text={t('remove-duplicate')}
                          icon={<ShieldOff className="h-4 w-4" />}
                        />
                      </button>
                    </div>
                  }
                  align="end"
                  openPopover={openPopover}
                  setOpenPopover={setOpenPopover}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenPopover(!openPopover);
                    }}
                    className="rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
                  >
                    <span className="sr-only">{t('edit-duplicate')}</span>
                    <ThreeDots className="h-5 w-5 text-gray-500" />
                  </button>
                </Popover>
              ) : (
                <Button
                  text={t('configure-duplicate')}
                  disabled={plan !== "enterprise"}
                  {...(plan !== "enterprise" && {
                    disabledTooltip: (
                      <TooltipContent
                        title={t('scim-directory-sync-is-only-available-on-enterprise-plans-upgrade-to-get-started')}
                        cta="Contact sales"
                        href="https://dub.co/enterprise"
                        target="_blank"
                      />
                    ),
                  })}
                  onClick={() => setShowSCIMModal(true)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-gray-50 px-3 py-5 sm:px-10">
          <a
            href="https://dub.co/help/category/saml-sso"
            target="_blank"
            className="text-sm text-gray-400 underline underline-offset-4 transition-colors hover:text-gray-700"
          >{t('learn-more-about-scim-directory-sync')}</a>
        </div>
      </div>
    </>
  );
};
