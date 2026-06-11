import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    q: 'How often is weather information updated?',
    a: 'Weather data is updated in real time throughout the day.',
  },
  {
    q: 'Can I search weather for any city?',
    a: 'Yes, weather information is available for cities worldwide.',
  },
  {
    q: 'Are weather alerts free?',
    a: 'Yes, weather alerts and notifications are completely free.',
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--alt">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq">
          {faqs.map((item, i) => (
            <div key={i} className={`faq__item ${open === i ? 'faq__item--open' : ''}`}>
              <button type="button" className="faq__question" onClick={() => setOpen(open === i ? -1 : i)}>
                {item.q}
                <span>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="faq__answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
