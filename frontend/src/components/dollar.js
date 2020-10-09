import React, { useContext, useEffect, useState } from "react";
import { parseString } from "xml2js";
import { data } from "../xmlData";
import { myContext } from "../wrappers/context";
import "./dollar.css";

const Dollar = (props) => {
  const context = useContext(myContext);
  const [isLoading, setIsLoading] = useState(false);

  const myState = context.globalState.dollar;

  useEffect(() => {
    const aa = async () => {
      let dollar = "";
      setIsLoading(true);
      try {
        await parseString(
          data,
          {
            mergeAttrs: true,

            explicitArray: true,

            ignoreAttrs: true,
          },
          (err, result) => {
            dollar = result.Tarih_Date.Currency[0];
          }
        );
        setIsLoading(false);
        context.functions.dollars.fetchData(Object.entries(dollar));
      } catch (error) {
        setIsLoading(false);
      }
    };
    aa();
  }, [parseString]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div
      className="dollar-wrapper"
      style={{
        transform: props.checked ? "translateY(0%)" : "translateY(-200%)",
      }}
    >
      <div className="dollar-table">
        {myState.map((item, index) => (
          <div
            key={index}
            className="dollar-info"
            style={{ border: index === myState.length - 1 && "none" }}
          >
            <div className="dolar-flex">
              <span>{item[0]}</span>
              <span>{item[1][0] !== "" ? item[1] : "belirtilmemiş"}</span>
            </div>
            <span className="ayrac"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dollar;
