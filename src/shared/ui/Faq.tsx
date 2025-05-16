import './Faq.css';
import Title from './Title';
import IconButton from './IconButton';
import { useState } from 'react';

// import type { FAQ } from '../../entities/project/projectSlice';

// interface FaqProps {
//   question: string;
//   answer: string;
// }

export default function Faq({faqData}) {

  const [isAnswerOpen, setIsAnswerOpen] = useState(true);

  return (
    <>
      <Title text="Frequently asked questions"/>
      {faqData.map((item, index) => (
        <div className="faq" key={index}>
          <div className="faq-content">
            <Title text={item.question}/>
            {isAnswerOpen && (<div className="faq-answer">{item.answer}</div>)}
          </div>

          <IconButton
            iconId="plus"
            onClick={() => setIsAnswerOpen(!isAnswerOpen)}
            rotate={isAnswerOpen}
          />
        </div>
      ))}
    </>
  )
}
