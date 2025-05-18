import './Faq.css';
import Title from './Title';
import IconButton from './IconButton';
import { useState } from 'react';
import {type FAQ} from '../../entities/project/projectSlice';

export default function Faq({ faqData }: {faqData: FAQ[]}) {

  const [faqId, setFaqId] = useState<string | null>(null);

  const handleAnswerToggle = (id: string) => {
    setFaqId(prevId => (prevId === id ? null : id));
  };

  return (
    <>
      <Title text="Frequently asked questions" size="2xl" />
      <div className="faq">
        {faqData.map((item) => (
          <div className="faq-wrapper" key={item.id}>
            <div className="faq-content">
              <div className="faq-question" onClick={() => handleAnswerToggle(item.id)}>
                <Title text={item.question} size="l" />
                <IconButton
                  variant="light-alpha"
                  iconId="plus"
                  className="b-radius"
                  iconSize="2"
                  rotate={item.id === faqId}
                />
              </div>
              {item.id === faqId && (<div className="faq-answer">{item.answer}</div>)}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
