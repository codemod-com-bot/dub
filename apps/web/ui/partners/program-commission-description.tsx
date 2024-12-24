import { useTranslations } from "next-intl";
import { ProgramProps } from "@/lib/types";
import { cn, currencyFormatter, pluralize } from "@dub/utils";

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
    <>{t('earn-commission-percentage-or-currency', { "component0": <strong className={cn("font-semibold", amountClassName)}>
        {program.commissionType === "percentage"
          ? program.commissionAmount + "%"
          : currencyFormatter(program.commissionAmount / 100, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{t('earn-commission-percentage-or-currency_component0')}
      </strong> })}
      {program.isLifetimeRecurring ? (
        <strong className={cn("font-semibold", periodClassName)}>
          {t('customer-lifetime')}</strong>
      ) : program.recurringCommission &&
        program.recurringDuration &&
        program.recurringDuration > 0 ? (
        <>{t('recurring-interval-and-duration', { "component0": <strong className={cn("font-semibold", periodClassName)}>{t('recurring-interval-and-duration_component0')}{program.recurringInterval || "cycle"}{t('recurring-interval-and-duration_component0')}
            {program.recurringDuration
              ? `${program.recurringDuration} ${pluralize(program.recurringInterval || "cycle", program.recurringDuration)}.`
              : null}
          </strong> })}
          
        </>
      ) : (
        "."
      )}
    </>
  );
}
