import { useEffect, useState } from "react";
import Counter from "./Counter";
import { fatchData } from "../utilits";
import AboutPopup from "./popup/AboutPopUp";

const About = ({ dark }) => {
  const [aboutData, setAboutData] = useState([]);
  const [popupdataEdu, setPopupdataEdu] = useState([]);
  const [popupdataExp, setPopupdataExp] = useState([]);
  const [popupdata, setPopupdata] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(async () => {
    const aboutData = await fatchData(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    );
    const education = aboutData.user.timeline
      .sort((a, b) => a.sequence - b.sequence)
      .filter((obj) => obj.forEducation && obj.enabled);
    const experience = aboutData.user.timeline
      .filter((obj) => !obj.forEducation && obj.enabled)
      .sort((a, b) => a.sequence - b.sequence);
    setAboutData(aboutData.user.about);
    setPopupdataEdu(education);
    setPopupdataExp(experience);
  }, []);

  const onClick = (arr) => {
    setPopup(true);
    setPopupdata(arr);
  };
  return (
    <div className="dizme_tm_section" id="about">
      <AboutPopup data={popupdata} open={popup} close={() => setPopup(false)} />
      <div className="dizme_tm_about">
        <div className="container">
          <div className="wrapper">
            <div className="left">
              <div className="image">
                <img src={`img/about/${dark ? 2 : 1}.jpg`} alt="image" />
                <div className="numbers year">
                  <div className="wrapper">
                    <h3>
                      <Counter end={18} />
                    </h3>
                    <span className="name">
                      Years of
                      <br />
                      Success
                    </span>
                  </div>
                </div>
                <div className="numbers project">
                  <div className="wrapper">
                    <h3>
                      <Counter end={9} />K
                    </h3>
                    <span className="name">
                      Total
                      <br />
                      Projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="title wow fadeInUp" data-wow-duration="1s">
                <span>{aboutData.title}</span>
                <h3>{aboutData.quote}</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                <strong onClick={() => onClick(popupdataEdu)}>Education</strong>
                <strong onClick={() => onClick(popupdataExp)}>
                  Experience
                </strong>
              </div>
              <div className="text wow fadeInUp" data-wow-duration="1s">
                <p>{aboutData.description}</p>
              </div>
              <div
                className="dizme_tm_button wow fadeInUp"
                data-wow-duration="1s"
              >
                <a className="anchor" href="#contact">
                  <span>Hire Me</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="brush_1 wow fadeInLeft" data-wow-duration="1s">
          <img src="img/brushes/about/1.png" alt="image" />
        </div>
        <div className="brush_2 wow fadeInRight" data-wow-duration="1s">
          <img src="img/brushes/about/2.png" alt="image" />
        </div>
      </div>
    </div>
  );
};
export default About;
