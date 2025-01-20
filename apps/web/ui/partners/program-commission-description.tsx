import { constructRewardAmount } from "@/lib/api/sales/construct-reward-amount";
import { DiscountProps, ProgramProps } from "@/lib/types";
import { cn, INFINITY_NUMBER, pluralize } from "@dub/utils";
import { useTranslations } from "next-intl";

export function ProgramCommissionDescription({
  program,
  discount,
  amountClassName,
  periodClassName,
}: {
  program: Pick<
    ProgramProps,
    | "commissionAmount"
    | "commissionType"
    | "commissionDuration"
    | "commissionInterval"
  >;
  discount?: DiscountProps | null;
  amountClassName?: string;
  periodClassName?: string;
}) {
  const t = useTranslations("../ui/partners");

  return (
    <>
      {t("earn-strong-commission-amount", {
        component0: (
          <strong className={cn("font-semibold", amountClassName)}>
            {constructRewardAmount({
              amount: program.commissionAmount,
              type: program.commissionType,
            })}
            {t("earn-strong-commission-amount_component0")}
          </strong>
        ),
      })}
      {program.commissionDuration === INFINITY_NUMBER ? (
        <strong className={cn("font-semibold", periodClassName)}>
          {t("customer-lifetime-reward")}
        </strong>
      ) : program.commissionDuration && program.commissionDuration > 1 ? (
        <>
          {t("recurrent-commission-interval", {
            component0: (
              <strong className={cn("font-semibold", periodClassName)}>
                {t("recurrent-commission-interval_component0")}
                {program.commissionInterval || "cycle"}
                {t("recurrent-commission-interval_component0")}
                {program.commissionDuration}
                {t("recurrent-commission-interval_component0")}
                {pluralize(
                  program.commissionInterval || "cycle",
                  program.commissionDuration,
                )}
              </strong>
            ),
          })}
        </>
      ) : (
        "."
      )}
      {discount ? (
        <>
          {t("referred-user-discount", {
            component0: (
              <strong className={cn("font-semibold", amountClassName)}>
                {constructRewardAmount({
                  amount: discount.amount,
                  type: discount.type,
                })}
              </strong>
            ),
            component1: (
              <strong className={cn("font-semibold", periodClassName)}>
                {discount.duration
                  ? `${discount.duration} ${pluralize(discount.interval || "cycle", discount.duration)}.`
                  : "their first purchase."}
              </strong>
            ),
          })}
        </>
      ) : null}
    </>
  );
}
