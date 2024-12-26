import { ProgramProps } from "@/lib/types";
import { cn, currencyFormatter, pluralize } from "@dub/utils";
import { useTranslations } from "next-intl";

export function ProgramCommissionDescription({
  program,
  amountClassName,
  periodClassName,
}: {
  program: Pick<
    ProgramProps,
    | "commissionType"
    | "commissionAmount"
    | "recurringCommission"
    | "recurringDuration"
    | "recurringInterval"
    | "isLifetimeRecurring"
  >;
  amountClassName?: string;
  periodClassName?: string;
}) {
  const t = useTranslations("../ui/partners");

  return (
    <>
      {t("earn-commission-for-each-sale", {
        component0: (
          <strong className={cn("font-semibold", amountClassName)}>
            {program.commissionType === "percentage"
              ? program.commissionAmount + "%"
              : currencyFormatter(program.commissionAmount / 100, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            {t("earn-commission-for-each-sale_component0")}
          </strong>
        ),
      })}
      {program.isLifetimeRecurring ? (
        <strong className={cn("font-semibold", periodClassName)}>
          {t("for-customers-lifetime")}
        </strong>
      ) : program.recurringCommission &&
        program.recurringDuration &&
        program.recurringDuration > 0 ? (
        <>
          {t("recurring-interval-and-duration", {
            component0: (
              <strong className={cn("font-semibold", periodClassName)}>
                {t("recurring-interval-and-duration_component0")}
                {program.recurringInterval || "cycle"}
                {t("recurring-interval-and-duration_component0")}
                {program.recurringDuration
                  ? `${program.recurringDuration} ${pluralize(program.recurringInterval || "cycle", program.recurringDuration)}.`
                  : null}
              </strong>
            ),
          })}
        </>
      ) : (
        "."
      )}
    </>
  );
}
