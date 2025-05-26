import './Faq.css';
import {useState, useEffect} from 'react';
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

  const handleAnswerToggle = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id)
        ? prev.filter(openId => openId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    if (faqData.length > 0 && openIds.length === 0) {
      setOpenIds([faqData[0].id]);
    }
  }, [faqData]);

  return (
    <>
      <Title text="Frequently asked questions:" size="xl" />
      <div className="faq-list">
        {
          faqData.map((item) => {
            if (item.id === '666' && project.toLowerCase() !== 'not pixel') {
              return null;
            }

            const isOpen = openIds.includes(item.id);
            return (
              <div id={`${project.toLowerCase()}-faq-${item.id}`} className="faq" key={item.id}>
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
                    subtitle={item.id === '666' && "☠️ Don't open this tab. Ok? OK?????" || ''}
                    size="l"
                  />
                  {
                    item.id !== '666'
                      ? <IconButton
                        variant="success"
                        iconId={isOpen ? "dash-lg" : "plus-lg"}
                        className="b-radius blur-bg"
                      />
                      : <IconButton
                        variant="danger"
                        iconId="plus-lg"
                        className="b-radius blur-bg"
                        onClick={() => navigate("/666")}
                      />
                  }
                </div>
                {isOpen && <div className="faq-answer">{item.answer}</div>}
              </div>
            );
          })
        }
      </div>
    </>
  );
}
