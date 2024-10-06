import { useSelector } from "react-redux";
import styles from "../../styles/frontend/different.module.css";

const Different = () => {
  const features = useSelector((store) => store.features);

  return (
    <>
      <section
        className={`${styles["what-makes-us-differnt"]} ${styles["custom-margin"]}`}
      >
        <div className="container">
          <div className={`${styles["header-wrapper"]}`}>
            <h2 className={`${styles["section-heading"]}`}>
              What make us different from others?
            </h2>
            <div className={`${styles["button-decor"]}`}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className={`${styles["lower-heading-short-description"]}`}>
            <p className="my-3">
              We are proud to deliver projects that shape our communities and
              strengthen our nation’s infrastructure and design. Our purpose is
              to improve people’s lives and beliefs through building and
              designing the facilities and infrastructure that our communities
              need.
            </p>
          </div>
          <div className="row gy-4">
            {features.map((feature) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={feature.id}>
                <div className={`${styles["features-card"]}`}>
                  <div className={`${styles["circular-double-line-decor"]}`}>
                    <figure>
                      <img
                        className={styles.photo}
                        src={feature.image}
                        alt={feature.title}
                      />
                    </figure>
                  </div>
                  <div className={`${styles["features-description"]}`}>
                    <h3 className={`${styles["features-title"]}`}>
                      {feature.title}
                    </h3>
                    <div className={styles.des}>
                      <p className="my-4">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Different;
