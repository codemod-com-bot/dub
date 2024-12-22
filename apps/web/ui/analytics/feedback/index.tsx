"use client";
import { useTranslation } from "react-i18next";


import { Button } from "@dub/ui";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback } from "./action";

export default function Feedback() {
const { t } = useTranslation("../ui/analytics/feedback");

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="scrollbar-hide relative z-0 h-[400px] overflow-scroll border border-gray-200 bg-white px-7 py-5 sm:rounded-lg sm:border-gray-100 sm:shadow-lg">
      <div className="mb-5 flex">
        <h1 className="text-xl font-semibold">{t('feedback')}</h1>
      </div>
      <AnimatePresence>
        {submitted ? (
          <motion.div
            className="flex h-[280px] flex-col items-center justify-center space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="h-8 w-8 text-green-500" />
            <p className="text-gray-500">{t('thank-you-for-your-feedback')}</p>
          </motion.div>
        ) : (
          <motion.form
            action={(data) =>
              submitFeedback(data).then(() => {
                setSubmitted(true);
              })
            }
            className="grid gap-5"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-gray-500"
              >{t('email')}</label>
              <input
                name="email"
                type="email"
                placeholder={t('panic-at-thedis-co')}
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="feedback"
                className="mb-2 block text-xs font-medium text-gray-500"
              >{t('feedback-title')}</label>
              <textarea
                name="feedback"
                id="feedback"
                required={true}
                rows={6}
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder={t('what-other-data-would-you-like-to-see')}
                aria-invalid="true"
              />
            </div>
            <FormButton />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const FormButton = () => {
const { t } = useTranslation("../ui/analytics/feedback");

  const { pending } = useFormStatus();
  return <Button text={t('submit-feedback')} loading={pending} />;
};
