import { convertDateFormat } from "../../utilits";

const AboutPopup = ({ data, open, close }) => {
  return (
    <div className={`dizme_tm_modalbox ${open ? "opened" : ""}`} id="about_box">
      <div className="box_inner">
        <div className="close">
          <a href="#" onClick={() => close()}>
            <i className="icon-cancel" />
          </a>
        </div>
        <ul>
          {data &&
            data.length &&
            data.map((obj, i) => {
              return (
                <li className="dodo_progress">
                  <div className="description_wrap" key={i}>
                    <div className="service_popup_informations">
                      <div className="main_title">
                        <h1>{obj.company_name}</h1>
                        <h2>{obj.jobTitle}</h2>
                        <span>{obj.jobLocation}</span>
                        <div
                          className="text wow fadeInUp"
                          data-wow-duration="1s"
                        >
                          <p>{obj.summary}</p>
                        </div>
                        <span>
                          <small>{convertDateFormat(obj.startDate)}</small> -
                          <small> {convertDateFormat(obj.endDate)}</small>
                        </span>
                      </div>

                      <div className="descriptions">
                        {obj.bulletPoints.map((dec, i) => (
                          <li key={i}>{dec}</li>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default AboutPopup;
