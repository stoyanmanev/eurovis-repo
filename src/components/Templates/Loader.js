import React from "react";

import loader from "../../images/layout/loader.svg";

export default function Loader() {
  return (
    <div className="loading-page">
      <img src={loader} alt="loading..." />
    </div>
  );
}
