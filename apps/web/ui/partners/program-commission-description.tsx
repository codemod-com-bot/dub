import { useTranslation, Trans } from "react-i18next";
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
const { t } = useTranslation("../ui/partners");

  return (
    <><Trans
i18nKey="earn-commission-for-each-sale"
components={{"0": 
      <strong className={cn("font-semibold", amountClassName)} />}}
/>{program.isLifetimeRecurring ? (
        <strong className={cn("font-semibold", periodClassName)}>{t('customer-lifetime')}</strong>
      ) : program.recurringCommission &&
        program.recurringDuration &&
        program.recurringDuration > 0 ? (
        <><Trans
i18nKey="recurring-interval-and-duration"
components={{"0": 
          <strong className={cn("font-semibold", periodClassName)} />}}
/>
        </>
      ) : (
        "."
      )}
    </>
  );
}
