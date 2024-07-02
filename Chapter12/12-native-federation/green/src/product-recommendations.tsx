import "./style/recommendations.css";
import React from "react";
import ReactDOM from "react-dom";
import reco1 from "./images/reco_1.jpg";
import reco2 from "./images/reco_2.jpg";
import reco3 from "./images/reco_3.jpg";
import reco4 from "./images/reco_4.jpg";
import reco5 from "./images/reco_5.jpg";
import reco6 from "./images/reco_6.jpg";
import reco7 from "./images/reco_7.jpg";
import reco8 from "./images/reco_8.jpg";
import reco9 from "./images/reco_9.jpg";

const baseUrl = 'http://localhost:2003';

const recos = {
  1: `${baseUrl}${reco1}`,
  2: `${baseUrl}${reco2}`,
  3: `${baseUrl}${reco3}`,
  4: `${baseUrl}${reco4}`,
  5: `${baseUrl}${reco5}`,
  6: `${baseUrl}${reco6}`,
  7: `${baseUrl}${reco7}`,
  8: `${baseUrl}${reco8}`,
  9: `${baseUrl}${reco9}`,
};

const allRecommendations = {
  porsche: ["3", "5", "6"],
  fendt: ["3", "6", "4"],
  eicher: ["1", "8", "7"],
};

const Recommendations = ({ sku = "porsche" }) => {
  const recommendations = allRecommendations[sku] || allRecommendations.porsche;

  return (
    <>
      <h3>Related Products</h3>
      {recommendations.map((id) => (
        <img src={recos[id]} key={id} alt={`Recommendation ${id}`} />
      ))}
    </>
  );
};

export default Recommendations;

export function renderRecommendations(container: HTMLElement) {
  ReactDOM.render(<Recommendations />, container);
}
