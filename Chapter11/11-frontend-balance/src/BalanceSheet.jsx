import * as React from "react";
import { items } from "./items";

const MoreBalanceInfo = ({ onRender, ...props }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    return onRender(ref.current, "balance-info", props);
  }, []);

  return <slot ref={ref} />;
};

const BalanceItem = ({ item, onRender }) => (
  <tr>
    <td>{item.name}</td>
    <td>{item.description}</td>
    <td>{item.amount}</td>
    <td>{item.location}</td>
    <td>
      <MoreBalanceInfo {...item} onRender={onRender} />
    </td>
  </tr>
);

export const BalanceSheet = ({ onRender }) => (
  <div style={{ border: "3px dashed blue" }}>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">Balance</h1>
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-2">
          <button type="button" className="btn btn-sm btn-outline-secondary">
            Share
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary">
            Export
          </button>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary dropdown-toggle"
        >
          <span data-feather="calendar"></span>
          This week
        </button>
      </div>
    </div>

    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Location</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <BalanceItem key={item.id} item={item} onRender={onRender} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
