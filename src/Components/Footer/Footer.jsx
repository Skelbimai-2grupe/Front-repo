import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links-div">
            <h4>For Business</h4>
            <p>Employer</p>
            <p>Health Plan</p>
            <p>individual</p>
          </div>
          <div className="sb_footer-links_div">
            <h4>Resourses</h4>
            <p>RRR.LT</p>
            <p>Zygio Baldai</p>
            <p>Senukai</p>
          </div>
          <div className="sb_footer-links_div">
            <h4>Partners</h4>
            <p>Moki-vezi</p>
          </div>
          <div className="sb_footer-links_div">
            <h4>Resourses</h4>
            <p>About us</p>
            <p>Contact us </p>
            <p>Home</p>
          </div>
          <hr />

          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <p>@2002 CodeInn. All Right reserverd.</p>
            </div>
            <div className="sb_footer-below-links">
              <div>
                <p>Terms & Conditions</p>
              </div>
              <div>
                <p>Privacy</p>
              </div>
              <div>
                <p>Security</p>
              </div>
              <div>
                <p>Cokies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
