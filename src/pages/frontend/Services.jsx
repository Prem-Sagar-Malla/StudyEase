import Service from "../../components/frontend/Service";
import styles from "../../styles/frontend/service.module.css";

const Services = () => {
  return (
    <>
      <div className={`${styles["breadcrumbs-section-wrapper"]}`}>
        <div className="container">
          <div className={`${styles["page-heading"]}`}>Services</div>
        </div>
      </div>
      <Service />
    </>
  );
};

export default Services;
