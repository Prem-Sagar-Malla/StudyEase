import React from "react";
import styles from "../../styles/frontend/ceo.module.css";

const CEO = () => {
  return (
    <>
      <section
        className={`${styles["message-from-ceo"]} ${styles["custom-margin"]}`}
      >
        <div className="container">
          <div className={styles.wrapper}>
            <div className={`${styles["ceo-cover"]}`}>
              <figure>
                <img src="../sample.png" alt="study-ease" />
              </figure>
            </div>
            <div className={`${styles["ceo-message-card"]} text-background`}>
              <div className={styles.intro}>
                <span className={styles.heading}>Message from CEO</span>
                <span className={styles.name}>Dawa Dorje Hyolmo (Kalu)</span>
              </div>
              <div>
                <p>
                  We are committed to maintain a partnership based on
                  transparency and reliability with our clients rather than an
                  ordinary client-contractor relationship.
                </p>

                <p>&nbsp;</p>

                <p>
                  We also take pride in our achievements, which we attribute to
                  the dedication of our staff, whose exceptional skills and
                  expertise are the key value of our company’s success. Thanks
                  to our loyal team of workers &amp; professionals, we have
                  succeeded in proving that we can deliver on our promises and
                  that we can rise to significant technical challenge, as well
                  as excel in our performance to the satisfaction of our
                  clients.
                </p>

                <p>&nbsp;</p>

                <p>
                  It has been a very challenging journey from the beginning of
                  our company in 2021 A.D until today. Having started as a small
                  family business, we are now among the top Buddist contracting
                  companies in Nepal. Our major challenge today is to sustain
                  our growth while maintaining a conservative financial
                  strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CEO;
