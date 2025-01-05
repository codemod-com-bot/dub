"use client";
import { useTranslations } from "next-intl";

import { createProgramApplicationAction } from "@/lib/actions/partners/create-program-application";
import { Program } from "@dub/prisma/client";
import { Button, useMediaQuery } from "@dub/ui";
import { cn } from "@dub/utils";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  website?: string;
  proposal: string;
  comments?: string;
};

export function ProgramApplicationForm({
  program,
}: {
  program: Pick<Program, "id" | "slug" | "name">;
}) {
  const t = useTranslations(
    "partners.dub.co/(apply)/apply/[programSlug]/application",
  );

  const { isMobile } = useMediaQuery();
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name ?? "");
      setValue("email", session.user.email ?? "");
    }
  }, [session?.user, setValue]);

  const { executeAsync, isExecuting } = useAction(
    createProgramApplicationAction,
    {
      async onSuccess({ data }) {
        if (!data) {
          toast.error("Failed to submit application. Please try again.");
          return;
        }

        toast.success("Your application submitted successfully.");

        const { programApplicationId, programEnrollmentId } = data;

        const searchParams = new URLSearchParams({
          applicationId: programApplicationId,
          ...(programEnrollmentId && {
            enrollmentId: programEnrollmentId,
          }),
        });

        router.push(
          `/apply/${program.slug}/application/success?${searchParams.toString()}`,
        );
      },
      onError({ error }) {
        toast.error(error.serverError);

        setError("root.serverError", {
          message: error.serverError,
        });
      },
    },
  );

  const isLoading = isSubmitting || isSubmitSuccessful || isExecuting;

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await executeAsync({
          ...data,
          programId: program.id,
        });
      })}
      className="flex flex-col gap-6"
    >
      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("name-label")}
        </span>
        <input
          type="text"
          className={cn(
            "mt-2 block w-full rounded-md focus:outline-none sm:text-sm",
            errors.name
              ? "border-red-400 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[var(--brand)] focus:ring-[var(--brand)]",
          )}
          placeholder={t("company-name-example")}
          autoFocus={!isMobile}
          {...register("name", {
            required: true,
          })}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("email-label")}
        </span>
        <input
          type="email"
          className={cn(
            "mt-2 block w-full rounded-md focus:outline-none sm:text-sm",
            errors.email
              ? "border-red-400 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[var(--brand)] focus:ring-[var(--brand)]",
          )}
          placeholder={t("email-example")}
          {...register("email", {
            required: true,
          })}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("website-social-media-label", {
            component0: (
              <span className="font-normal text-neutral-500">
                {t("website-social-media-label_component0")}
              </span>
            ),
          })}
        </span>
        <input
          type="text"
          className={cn(
            "mt-2 block w-full rounded-md focus:outline-none sm:text-sm",
            errors.website
              ? "border-red-400 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[var(--brand)] focus:ring-[var(--brand)]",
          )}
          placeholder={t("website-example")}
          {...register("website")}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("promotion-plan-question", { program_name: program.name })}
        </span>
        <ReactTextareaAutosize
          className={cn(
            "mt-2 block max-h-48 min-h-12 w-full rounded-md focus:outline-none sm:text-sm",
            errors.proposal
              ? "border-red-400 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[var(--brand)] focus:ring-[var(--brand)]",
          )}
          placeholder={t("empty-string")}
          minRows={3}
          {...register("proposal", { required: true })}
        />
      </label>

      <label>
        <span className="text-sm font-medium text-gray-800">
          {t("additional-questions-label", {
            component0: (
              <span className="font-normal text-neutral-500">
                {t("additional-questions-label_component0")}
              </span>
            ),
          })}
        </span>
        <ReactTextareaAutosize
          className={cn(
            "mt-2 block max-h-48 min-h-12 w-full rounded-md focus:outline-none sm:text-sm",
            errors.comments
              ? "border-red-400 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[var(--brand)] focus:ring-[var(--brand)]",
          )}
          placeholder={t("empty-string")}
          minRows={3}
          {...register("comments")}
        />
      </label>

      <Button
        text={t("submit-application-button")}
        className="mt-4 enabled:border-[var(--brand)] enabled:bg-[var(--brand)] enabled:hover:bg-[var(--brand)] enabled:hover:ring-[var(--brand-ring)]"
        loading={isLoading}
      />
    </form>
  );
}
