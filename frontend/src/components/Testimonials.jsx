import './Testimonials.css';

const reviews = [
  { text: 'The most accurate weather forecasts I have used.', author: 'Sarah M.', rating: 5 },
  { text: 'Clean interface and reliable updates every day.', author: 'James K.', rating: 5 },
  { text: 'Perfect for travel planning and outdoor activities.', author: 'Aisha R.', rating: 5 },
];

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials grid-3">
          {reviews.map((r) => (
            <div key={r.author} className="testimonial card">
              <div className="testimonial__stars">{'★'.repeat(r.rating)}</div>
              <p>&ldquo;{r.text}&rdquo;</p>
              <span className="testimonial__author">— {r.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
