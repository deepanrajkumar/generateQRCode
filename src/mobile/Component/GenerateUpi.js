import React, { useState } from "react";
import ScreenContainer from "./Common/ScreenContainer";
import InputCommon from "./Common/InputCommon";
import { ScrollView, Text } from "react-native";

const GenerateUpi = () => {
  const [upiData, setUpiData] = useState({});
  const { pa, pn, am, tn } = upiData;

  const upiUrl = () => {
    const getUpiData = () => {
      const keyData = Object.keys(upiData);
      return keyData.map((data) => `${data}=${upiData[data]}&`);
    };
    // const formatData = `http:///${payeeName && `pa=${payeeName}&`}${
    //   payeeVpa && `pn=${payeeVpa}&`
    // }`;
    //
    // return formatData.replace(/.$/, '');
    return JSON.stringify(getUpiData().flat(1));
  };

  return (
    <ScreenContainer>
      <ScrollView>
        <InputCommon
          name="Payee Name - pn"
          getValue={(text) => setUpiData({ ...upiData, pn: text })}
          value={pn}
        />
        <InputCommon
          name="Payee VPA - pa"
          getValue={(text) => setUpiData({ ...upiData, pa: text })}
          value={pa}
        />
        <InputCommon
          name="Transaction amount - am"
          getValue={(text) => setUpiData({ ...upiData, am: text })}
          value={am}
          kyboardType="numeric"
        />
        <InputCommon
          name="Transaction note - tn"
          getValue={(text) => setUpiData({ ...upiData, tn: text })}
          value={tn}
        />
      </ScrollView>
      <Text>{upiUrl()}</Text>
    </ScreenContainer>
  );
};

export default GenerateUpi;
