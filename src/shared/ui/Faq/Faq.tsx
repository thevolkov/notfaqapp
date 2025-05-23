import './Faq.css';
import {useState} from 'react';
import {type FAQ} from '../../../entities/project/projectSlice';
import {Title, IconButton} from '../';
import {NavLink} from 'react-router-dom';

export default function Faq({project, faqData, highlightId}: {
  project: string,
  faqData: FAQ[],
  highlightId?: string | null;
}) {

  const [faqId, setFaqId] = useState<string | null>(highlightId || null);
  console.log(faqId)
  const handleAnswerToggle = (id: string) => {
    setFaqId(prevId => (prevId === id ? null : id));
  };

  return (
    <>
      <Title text="Frequently asked questions" size="2xl" />
      <div className="faq-list">
        {
          faqData.map((item) => (
            <div id={`${project.toLowerCase()}-faq-${item.id}`} className="faq" key={item.id}>
              <div
                className="faq-question"
                // onClick={() => handleAnswerToggle(item.id)}
              >
                <Title text={item.question} size="l" />
                {
                  item.id !== '666' ? (
                    <IconButton
                      variant="light-alpha"
                      iconId="plus-lg"
                      className="b-radius blur-bg"
                      rotate={item.id === faqId}
                      onClick={() => handleAnswerToggle(item.id)}
                    />
                  ) : (
                    <NavLink to="/666">
                      <IconButton
                        variant="light-alpha"
                        iconId="plus-lg"
                        className="b-radius blur-bg"
                        rotate={item.id === faqId}
                      />
                    </NavLink>
                  )
                }
              </div>
              {
                item.id === faqId && (
                  <div className="faq-answer">{item.answer}</div>
                )
              }
            </div>
          ))
        }
      </div>
    </>
  )
}
