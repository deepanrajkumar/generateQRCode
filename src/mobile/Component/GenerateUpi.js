import React, { useState } from "react";
import ScreenContainer from "./Common/ScreenContainer";
import InputCommon from "./Common/InputCommon";
import { ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const styles = {
  urlContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontWeight: "bold", marginBottom: 20, color: "maroon" },
};

const GenerateUpi = () => {
  const [upiData, setUpiData] = useState({});
  const { pa, pn, am, tn } = upiData;

  const upiUrl = (params) => {
    const keyData = Object.keys(params);
    const urlParams = keyData
      .map((data) => params[data] && `${data}=${params[data]}&`)
      .join("")
      .replace(/.$/, "");

    const data = [];

    keyData.forEach((value) => {
      return data.push(params[value]);
    });

    console.log(`data`, data);
    console.log(`urlParams`, urlParams);
    // return data;

    const url = urlParams && `upi://pay&${urlParams}`;
    // setUpiUrlData(url);

    return url;
  };

  const upiUrlData = upiUrl(upiData);

  return (
    <ScreenContainer>
      <ScrollView>
        <InputCommon
          label="Payee Name - pn"
          getValue={(text) => setUpiData({ ...upiData, pn: text })}
          value={pn}
        />
        <InputCommon
          label="Payee VPA - pa"
          getValue={(text) => setUpiData({ ...upiData, pa: text })}
          value={pa}
        />
        <InputCommon
          label="Transaction amount - am"
          getValue={(text) => setUpiData({ ...upiData, am: text })}
          value={am}
          keyboardType="numeric"
        />
        <InputCommon
          label="Transaction note - tn"
          getValue={(text) => setUpiData({ ...upiData, tn: text })}
          value={tn}
        />
        <View style={styles.urlContainer}>
          <Text style={styles.text}>{`${upiUrlData}`}</Text>
          {upiUrlData ? <QRCode value={upiUrlData} size={300} /> : null}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default GenerateUpi;
