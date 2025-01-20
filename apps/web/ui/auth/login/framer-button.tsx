"use client";
import { useTranslations } from "next-intl";

import { Button } from "@dub/ui";
import { cn } from "@dub/utils";
import { Framer } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const FramerButton = () => {
  const t = useTranslations("../ui/auth/login");

  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      text={t("login-with-framer")}
      variant="secondary"
      onClick={() => {
        setClicked(true);
        signIn("framer", {
          ...(next && next.length > 0 ? { callbackUrl: next } : {}),
        });
      }}
      icon={<Framer className="size-4 fill-white text-white" />}
      className={cn(!clicked && "bg-blue-600 text-white hover:bg-blue-700")}
      loading={clicked}
    />
  );
};
