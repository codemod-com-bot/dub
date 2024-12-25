"use client";
import { useTranslations } from "next-intl";

import { onboardPartnerAction } from "@/lib/actions/partners/onboard-partner";
import { onboardPartnerSchema } from "@/lib/zod/schemas/partners";
import {
  Button,
  buttonVariants,
  Combobox,
  FileUpload,
  useEnterSubmit,
  useMediaQuery,
} from "@dub/ui";
import { COUNTRIES } from "@dub/utils";
import { cn } from "@dub/utils/src/functions";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";

type OnboardingFormData = z.infer<typeof onboardPartnerSchema>;

export function OnboardingForm() {
  const t = useTranslations("partners.dub.co/(onboarding)/onboarding");

  const router = useRouter();
  const { data: session } = useSession();
  const { isMobile } = useMediaQuery();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<OnboardingFormData>();

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name ?? "");
      setValue("email", session.user.email ?? "");
    }
  }, [session?.user]);

  const { executeAsync, isExecuting } = useAction(onboardPartnerAction, {
    onSuccess: () => {
      if (watch("country") === "US") {
        router.push("/onboarding/verify");
      } else {
        router.push("/programs");
      }
    },
    onError: ({ error, input }) => {
      toast.error(error.serverError);
      reset(input);
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const { handleKeyDown } = useEnterSubmit(formRef);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(executeAsync)}
      className="flex w-full flex-col gap-4 text-left"
    >
      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("full-name-required", {
            component0: (
              <span className="font-normal text-neutral-500">
                {t("full-name-required_component0")}
              </span>
            ),
          })}
        </span>
        <input
          type="text"
          className={cn(
            "mt-2 block w-full rounded-md focus:outline-none sm:text-sm",
            errors.name
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500",
          )}
          autoFocus={!isMobile}
          {...register("name", {
            required: true,
          })}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("email-required", {
            component0: (
              <span className="font-normal text-neutral-500">
                {t("email-required_component0")}
              </span>
            ),
          })}
        </span>
        <input
          type="text"
          className={cn(
            "mt-2 block w-full rounded-md focus:outline-none sm:text-sm",
            errors.email
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500",
          )}
          {...register("email", {
            required: true,
          })}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("display-image-required", {
            component0: (
              <span className="font-normal text-neutral-500">
                {t("display-image-required_component0")}
              </span>
            ),
          })}
        </span>
        <div className="flex items-center gap-5">
          <Controller
            control={control}
            name="image"
            rules={{ required: true }}
            render={({ field }) => (
              <FileUpload
                accept="images"
                className={cn(
                  "mt-2 size-20 rounded-md border border-gray-300",
                  errors.image && "border-0 ring-2 ring-red-500",
                )}
                iconClassName="w-5 h-5"
                previewClassName="size-10 rounded-full"
                variant="plain"
                imageSrc={field.value}
                readFile
                onChange={({ src }) => field.onChange(src)}
                content={null}
                maxFileSizeMB={2}
                targetResolution={{ width: 160, height: 160 }}
              />
            )}
          />
          <div>
            <div
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex h-7 w-fit cursor-pointer items-center rounded-md border px-2 text-xs",
              )}
            >
              {t("upload-image")}
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              {t("recommended-size-160x160px")}
            </p>
          </div>
        </div>
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("country-required", {
            component0: (
              <span className="font-normal text-neutral-500">
                {t("country-required_component0")}
              </span>
            ),
          })}
        </span>
        <Controller
          control={control}
          name="country"
          rules={{ required: true }}
          render={({ field }) => <CountryCombobox {...field} />}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("description")}
        </span>
        <ReactTextareaAutosize
          className={cn(
            "mt-2 block w-full rounded-md focus:outline-none sm:text-sm",
            errors.description
              ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500",
          )}
          placeholder={t("content-description")}
          minRows={3}
          onKeyDown={handleKeyDown}
          {...register("description")}
        />
      </label>

      <Button
        type="submit"
        text={t("create-partner-account")}
        className="mt-2"
        loading={isExecuting || isSubmitting || isSubmitSuccessful}
      />
    </form>
  );
}

function CountryCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("partners.dub.co/(onboarding)/onboarding");

  const options = useMemo(
    () =>
      Object.entries(COUNTRIES).map(([key, value]) => ({
        icon: (
          <img
            alt={value}
            src={`https://hatscripts.github.io/circle-flags/flags/${key.toLowerCase()}.svg`}
            className="mr-1.5 size-4"
          />
        ),
        value: key,
        label: value,
      })),
    [],
  );

  return (
    <Combobox
      selected={options.find((o) => o.value === value) ?? null}
      setSelected={(option) => {
        if (!option) return;
        onChange(option.value);
      }}
      options={options}
      icon={
        value ? (
          <img
            alt={COUNTRIES[value]}
            src={`https://hatscripts.github.io/circle-flags/flags/${value.toLowerCase()}.svg`}
            className="mr-0.5 size-4"
          />
        ) : undefined
      }
      caret={true}
      placeholder={t("select-country")}
      searchPlaceholder="Search countries..."
      matchTriggerWidth
      buttonProps={{
        className: cn(
          "mt-2 w-full justify-start border-gray-300 px-3",
          "data-[state=open]:ring-1 data-[state=open]:ring-gray-500 data-[state=open]:border-gray-500",
          "focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition-none",
          !value && "text-gray-400",
        ),
      }}
    />
  );
}
