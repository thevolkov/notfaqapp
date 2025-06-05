import './Faq.css';
import {useState, useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {type FAQ} from '../../../entities/project/projectSlice';
import {Title, IconButton} from '../';

export default function Faq({project, faqData}: {
  project: string,
  faqData: FAQ[],
  highlightId?: string | null;
}) {
  const navigate = useNavigate();
  const [openIds, setOpenIds] = useState<string[]>([]);

  const handleAnswerToggle = useCallback((id: string) => {
    setOpenIds(prev =>
      prev.includes(id)
        ? prev.filter(openId => openId !== id)
        : [...prev, id]
    );
  }, []);

  useEffect(() => {
    if (faqData.length > 0 && openIds.length === 0) {
      setOpenIds([faqData[0].id]);
    }
  }, [faqData]);

  return (
    <>
      <Title className="faq-title" text="Frequently asked questions:" size="xl" />
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
                  <Title
                    text={item.question}
                    size="l"
                  />
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
