import { useTranslation } from "react-i18next";
import { Button } from "@dub/ui";
import { Google } from "@dub/ui/icons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { LoginFormContext } from "./login-form";

export function GoogleButton() {
const { t } = useTranslation("../ui/auth/login");

  const searchParams = useSearchParams();
  const next = searchParams?.get("next");

  const { setClickedMethod, clickedMethod, setLastUsedAuthMethod } =
    useContext(LoginFormContext);

  return (
    <Button
      text={t('continue-with-google')}
      variant="secondary"
      onClick={() => {
        setClickedMethod("google");
        setLastUsedAuthMethod("google");
        signIn("google", {
          ...(next && next.length > 0 ? { callbackUrl: next } : {}),
        });
      }}
      loading={clickedMethod === "google"}
      disabled={clickedMethod && clickedMethod !== "google"}
      icon={<Google className="size-4" />}
    />
  );
}
