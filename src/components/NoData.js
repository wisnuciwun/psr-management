import React from "react";

export default function NoData() {
  return (
    <div className="d-flex justify-content-center flex-wrap">
      <img src="/assets/no_data.png" style={{ width: "100px" }} alt="" />
      <div className="flex-break"></div>
      <div className="text-center mt-2">
        <div className="font-md">No Data</div>
        <div className="font-sm">Silahkan tambahkan data terlebih dahulu</div>
      </div>
    </div>
  );
}
