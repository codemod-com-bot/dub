"use client";
import { useTranslations } from "next-intl";


import { InlineSnippet } from "@dub/ui";
import { createHref, STAGGER_CHILD_VARIANTS } from "@dub/utils";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function PlaceholderContent() {
const t = useTranslations("[domain]");

  const { domain } = useParams() as { domain: string };
  const [loading, setLoading] = useState(true);
  const onLoad = () => {
    setLoading(false);
  };
  // workaround to avoid the blinking effect when Spline loads
  const [opacity] = useDebounce(loading ? 0 : 1, 200);

  const [showText] = useDebounce(loading ? false : true, 800);

  return (
    <motion.div
      className="z-10 mb-20"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div
        className={`${
          loading ? "scale-[25%] blur-md" : "scale-100 blur-0"
        } mt-[7vh] h-[50vh] w-screen object-cover transition-all duration-1000`}
      >
        <Spline
          onLoad={onLoad}
          style={{ opacity: opacity }}
          scene="https://assets.dub.co/misc/scene.splinecode"
        />
      </div>
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        animate={showText ? "show" : "hidden"}
        className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
      >
        <motion.h1
          className="font-display text-4xl font-bold text-gray-800 transition-colors sm:text-5xl"
          variants={STAGGER_CHILD_VARIANTS}
        >{t('welcome-to-app-name', { "process_env_NEXT_PUBLIC_APP_NAME": process_env_NEXT_PUBLIC_APP_NAME })}
        </motion.h1>
        <motion.p
          className="max-w-xl text-gray-600 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          {t('inline-snippet-custom-domain-link-management', { "component0": {t('inline-snippet-custom-domain-link-management_component0', { "_domain_": _domain_ })}, "component1": {t('inline-snippet-custom-domain-link-management_component1', { "_process_env_NEXT_PUBLIC_APP_NAME_": _process_env_NEXT_PUBLIC_APP_NAME_ })} })}
          </motion.p>
        <motion.a
          variants={STAGGER_CHILD_VARIANTS}
          href={createHref("/home", domain, {
            utm_source: "Custom Domain",
            utm_medium: "Welcome Page",
            utm_campaign: domain,
            utm_content: "Create Your Free Branded Link",
          })}
          className="rounded-full bg-gray-800 px-10 py-2 font-medium text-white transition-colors hover:bg-black"
        >{t('create-your-free-branded-link')}</motion.a>
      </motion.div>
    </motion.div>
  );
}
