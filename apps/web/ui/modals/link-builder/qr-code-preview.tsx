import useDomain from "@/lib/swr/use-domain";
import useWorkspace from "@/lib/swr/use-workspace";
import { QRCode } from "@/ui/shared/qr-code";
import {
  Button,
  ShimmerDots,
  useInViewport,
  useKeyboardShortcut,
  useLocalStorage,
  useMediaQuery,
} from "@dub/ui";
import { Pen2, QRCode as QRCodeIcon } from "@dub/ui/icons";
import { DUB_QR_LOGO, linkConstructor } from "@dub/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { LinkFormData } from ".";
import { QRCodeDesign, useLinkQRModal } from "../link-qr-modal";

export function QRCodePreview() {
  const t = useTranslations("../ui/modals/link-builder");

  const { isMobile } = useMediaQuery();
  const {
    id: workspaceId,
    logo: workspaceLogo,
    plan: workspacePlan,
  } = useWorkspace();

  const { watch } = useFormContext<LinkFormData>();
  const { key: rawKey, domain: rawDomain } = watch();
  const [key] = useDebounce(rawKey, 500);
  const [domain] = useDebounce(rawDomain, 500);

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(ref);

  const { logo: domainLogo } = useDomain({
    slug: rawDomain,
    enabled: isVisible,
  });

  const [data, setData] = useLocalStorage<QRCodeDesign>(
    `qr-code-design-${workspaceId}`,
    {
      fgColor: "#000000",
      hideLogo: true,
    },
  );

  const shortLinkUrl = useMemo(() => {
    return key && domain ? linkConstructor({ key, domain }) : undefined;
  }, [key, domain]);

  const hideLogo = data.hideLogo && workspacePlan !== "free";
  const logo =
    workspacePlan === "free"
      ? DUB_QR_LOGO
      : domainLogo || workspaceLogo || DUB_QR_LOGO;

  const { LinkQRModal, setShowLinkQRModal } = useLinkQRModal({
    props: {
      key: rawKey,
      domain: rawDomain,
    },
    onSave: (data) => setData(data),
  });

  useKeyboardShortcut("q", () => setShowLinkQRModal(true), {
    modal: true,
    enabled: Boolean(shortLinkUrl),
  });

  return (
    <div ref={ref}>
      <LinkQRModal />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-700">{t("qr-code")}</h2>
        <Button
          type="button"
          variant="outline"
          icon={<Pen2 className="mx-px size-4" />}
          className="h-7 w-fit px-1"
          onClick={() => setShowLinkQRModal(true)}
          disabledTooltip={
            key && domain ? undefined : "Enter a short link to customize"
          }
        />
      </div>
      <div className="relative mt-2 h-24 overflow-hidden rounded-md border border-gray-300">
        {!isMobile && (
          <ShimmerDots className="opacity-30 [mask-image:radial-gradient(40%_80%,transparent_50%,black)]" />
        )}
        {shortLinkUrl ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={shortLinkUrl}
              initial={{ filter: "blur(2px)", opacity: 0.4 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(2px)", opacity: 0.4 }}
              transition={{ duration: 0.1 }}
              className="relative flex size-full items-center justify-center"
            >
              <QRCode
                url={shortLinkUrl}
                fgColor={data.fgColor}
                hideLogo={hideLogo}
                logo={logo}
                scale={0.5}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2">
            <QRCodeIcon className="size-5 text-gray-700" />
            <p className="max-w-32 text-center text-xs text-gray-700">
              {t("enter-short-link-for-qr-code")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
