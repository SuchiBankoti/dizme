import { useEffect, useState } from "react";
import { activeSkillProgress, fatchData } from "../utilits";
import { INDEX_COLORS } from "../constants";

const Skills = ({ dark }) => {
  const [skills, setSkills] = useState({});
  useEffect(async () => {
    // setData(await fatchData("/static/info.json"));
    const skillData = await fatchData(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    );
    const skillArr = skillData.user.skills
      .sort((a, b) => a.sequence - b.sequence)
      .filter((obj) => obj.enabled)
      .map((obj, i) => {
        const { percentage: value, name } = obj;
        return {
          value,
          name,
          color: INDEX_COLORS[i],
        };
      });
    setSkills(skillArr);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", activeSkillProgress);
  }, []);

  return (
    <div className="dizme_tm_section">
      <div className="dizme_tm_skills">
        <div className="container">
          <div className="wrapper">
            <div className="left">
              <div
                className="dizme_tm_main_title wow fadeInUp"
                data-wow-duration="1s"
                data-align="left"
              >
                <span>Design is Life</span>
                <h3>I Develop Skills Regularly to Keep Me Update</h3>
                <p>
                  Most common methods for designing websites that work well on
                  desktop is responsive and adaptive design
                </p>
              </div>
              <div
                className="dodo_progress wow fadeInUp"
                data-wow-duration="1s"
              >
                {skills &&
                  skills.length &&
                  skills.map((skill, i) => (
                    <div
                      className="progress_inner skillsInner___"
                      data-value={skill.value}
                      data-color={skill.color}
                      key={i}
                    >
                      <span>
                        <span className="label">{skill.name}</span>
                        <span className="number">{skill.value}%</span>
                      </span>
                      <div className="background">
                        <div className="bar">
                          <div className="bar_in" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="right">
              <img src={`img/skills/${dark ? 2 : 1}.jpg`} alt="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Skills;
