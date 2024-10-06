import "../../index.css";

const Quote = () => {
  return (
    <>
      {/* Quote Blue Background Section */}
      <section className="vh-20" style={{ backgroundColor: "dodgerblue" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div
                className="card"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "#198754",
                  color: "white",
                }}
              >
                <div className="card-body ">
                  <div className="text-center mb-4 pb-2">
                    <img
                      src="../study-ease.png"
                      alt="Nepal"
                      width="100"
                      className="quote-logo"
                    />
                  </div>
                  <figure className="text-center mb-0">
                    <blockquote className="blockquote">
                      <p className="pb-3">
                        <i className="fas fa-quote-left fa-xs text-black"></i>
                        <span
                          className="lead font-italic"
                          style={{ color: "#fff" }}
                        >
                          Many of life's failures are people who did not realize
                          how close they were to success when they gave up.
                        </span>
                        <i className="fas fa-quote-right fa-xs text-black"></i>
                      </p>
                    </blockquote>
                    <figcaption
                      className="blockquote-footer mb-0"
                      style={{ color: "white" }}
                    >
                      Prem Sagar Malla
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Quote;
