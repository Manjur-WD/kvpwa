import { useTranslation } from "react-i18next";
import faqImage from "../../../assets/images/faq.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const {t} = useTranslation();
  return (
    <>
      <section className="faq_section md:p-10 p-5 bg-white">
        <div className="container  grid lg:grid-cols-2 grid-cols-1  gap-10">
          <div className="faq_left border lg:rounded-[50px] rounded-2xl  md:p-10  p-5 flex flex-col justify-center items-center">
            <h2 className="md:text-6xl text-2xl font-bold">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p>
              Do you need some help with something or do you have questions on
              some features?
            </p>
            <img
              src={faqImage}
              alt="This is faq related image"
              className="w-full"
            />
          </div>
          <div className="faq_right">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                  {t('faq1')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq1_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                {t('faq2')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq2_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                {t('faq3')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq3_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                {t('faq4')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq4_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">{t('faq5')} </AccordionTrigger>
                <AccordionContent>
                {t('faq5_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                {t('faq6')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq6_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                {t('faq7')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq7_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                {t('faq8')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq8_ans')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger className="text-lg font-normal bg-whitesmoke text-darkGreen">
                {t('faq9')}
                </AccordionTrigger>
                <AccordionContent>
                {t('faq9_ans')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
