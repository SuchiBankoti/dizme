import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { fatchData } from "../utilits";
import ServicePopup from "./popup/ServicePopup";

const Service = ({ dark }) => {
  const [data, setData] = useState([]);
  const [popupdata, setPopupdata] = useState({});
  const [popup, setPopup] = useState(false);

  useEffect(async () => {
    // setData(await fatchData("/static/service.json"));
    const serviceData = await fatchData(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    );
    const services = serviceData.user.services;

    const localData = await fatchData("/static/service.json");
    const temp = localData.map((service, i) => {
      const {
        name: title,
        charge: price,
        desc: shortDesc,
        image: { url: img },
      } = services[i];
      return {
        title,
        price,
        shortDesc,
        img,
        icon: service.icon,
        dec: service.dec,
      };
    });
    setData(temp);
    setTimeout(() => {
      let VanillaTilt = require("vanilla-tilt");
      VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
        maxTilt: 6,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        speed: 500,
        transition: true,
      });
    }, 1000);
  }, []);

  const onClick = (index) => {
    setPopup(true);
    setPopupdata(data && data[index]);
  };

  return (
    <div className="dizme_tm_section" id="service">
      <ServicePopup
        data={popupdata}
        open={popup}
        close={() => setPopup(false)}
      />
      <div className="dizme_tm_services">
        <div className="container">
          <div className="dizme_tm_main_title" serviceData-align="center">
            <span>Services</span>
            <h3>What I Do for Clients</h3>
            <p>
              Most common methods for designing websites that work well on
              desktop is responsive and adaptive design
            </p>
          </div>
          <div className="service_list">
            <ul>
              {data &&
                data.map(
                  (service, i) =>
                    service && (
                      <li
                        className={`wow ${
                          (i * 1) % 2 === 0 ? "fadeInLeft" : "fadeInRight"
                        }`}
                        obj-wow-duration="1s"
                        key={i}
                        onClick={() => onClick(i)}
                      >
                        <div className="list_inner tilt-effect">
                          <span className="icon">
                            {parse(service.icon.svg)}
                            {dark ? (
                              <img
                                className="back"
                                src={service.icon.iconBgDark}
                                alt="image"
                              />
                            ) : (
                              <img
                                className="back"
                                src={service.icon.iconBg}
                                alt="image"
                              />
                            )}
                          </span>
                          <div className="title">
                            <h3>{service.title}</h3>
                            <span className="price">
                              Starts from <span>{service.price}</span>
                            </span>
                          </div>
                          <div className="text">
                            <p>{service.shortDesc}</p>
                          </div>
                          <a className="dizme_tm_full_link" href="#" />
                          <img
                            className="popup_service_image"
                            src="img/service/1.jpg"
                            alt="image"
                          />
                        </div>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
        <div className="brush_1 wow fadeInLeft" serviceData-wow-duration="1s">
          <img src="img/brushes/service/5.png" alt="image" />
        </div>
        <div className="brush_2 wow zoomIn" serviceData-wow-duration="1s">
          <img src="img/brushes/service/6.png" alt="image" />
        </div>
      </div>
    </div>
  );
};
export default Service;
