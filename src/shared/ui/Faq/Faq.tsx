import './Faq.css';
import {useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {type FAQ} from '../../../entities/project/projectSlice';
import {Title, IconButton} from '../';
import paul from '../../assets/imgs/paul.webp';
import soon from '../../assets/imgs/soonsoon.png';
import wimv from '../../assets/imgs/wimv.png';
import {useAppSelector} from '../../../app/store';

export default function Faq({project, faqData}: {
  project: string,
  faqData: FAQ[],
  highlightId?: string | null;
}) {
  const navigate = useNavigate();
  const showVouchers = useAppSelector((state) => state.console.vouchers);
  const [openIds, setOpenIds] = useState<string[]>([]);

  const visibleSoon = faqData.length > 0 && openIds.includes(faqData[0].id);
  const soonPng = showVouchers ? wimv : soon;

  const handleAnswerToggle = useCallback((id: string) => {
    setOpenIds(prev =>
      prev.includes(id)
        ? prev.filter(openId => openId !== id)
        : [...prev, id]
    );
  }, []);


  return (
    <>
      <div className="relative">
        <img className={`faq-soon absolute ${visibleSoon ? "visible" : ""}`} src={soonPng} alt="soon"/>
        <img className="faq-paul absolute" src={paul} alt="FAQ"/>
        <Title className="faq-title" text="🗿Frequently Annoying Questions:" size="xl" />
      </div>
      <div className="faq-list">
        {
          faqData.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                id={`${project.toLowerCase()}-faq-${item.id}`}
                className={`faq element-wrapper blur-bg relative ${!item.published && 'faq-draft'}`}
                key={item.id}
              >
                <div
                  className="faq-question pointer"
                  onClick={() =>
                    item.id === '666'
                      ? navigate("/666")
                      : handleAnswerToggle(item.id)
                  }
                >
                  <Title text={item.question} size="l" />
                  {
                    !item.published ? (
                      <IconButton
                        variant="secondary"
                        iconId="eye-slash"
                        className="tooltip"
                        data-tooltip="draft"
                      />
                    ) : (
                      <IconButton
                        variant="primary"
                        iconId={isOpen ? "dash-lg" : "plus-lg"}
                      />
                    )
                  }
                </div>
                {
                  isOpen && (
                    <div className="faq-answer">{item.answer}</div>
                  )
                }
              </div>
            );
          })
        }
      </div>
    </>
  );
}
