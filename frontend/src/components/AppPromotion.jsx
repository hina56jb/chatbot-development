import './AppPromotion.css';

function AppPromotion() {
  return (
    <section className="app-promo">
      <div className="container app-promo__inner">
        <div className="app-promo__text">
          <h2>Take Weather Updates Anywhere</h2>
          <p>
            Download our mobile application and receive instant weather alerts, forecasts, and notifications directly on your device.
          </p>
          <div className="app-promo__buttons">
            <button type="button" className="app-promo__btn">Download for Android</button>
            <button type="button" className="app-promo__btn app-promo__btn--outline">Download for iPhone</button>
          </div>
        </div>
        <div className="app-promo__visual">📱</div>
      </div>
    </section>
  );
}

export default AppPromotion;
