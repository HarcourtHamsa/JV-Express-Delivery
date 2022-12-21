import React from "react";
import WhatsAppLogo from "../assets/images/whatsapp-logo-png-2261.png";

export default function WhatsAppWidget() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=180232024915"
      className="widget"
      style={{ zIndex: 3 }}
    >
      <img src={WhatsAppLogo} alt="" />
    </a>
  );
}
