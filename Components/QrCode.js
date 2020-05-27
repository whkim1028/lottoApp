import React, { useState, useEffect } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, DataTable } from "react-native-paper";

function QrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [numbersArr, setNumbersArr] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    alert(data);
    let rndStr = data.split("=");
    let lottoData = rndStr[1].split("q");
    let round = lottoData[0];

    for (let i = 1; i < lottoData.length; i++) {
      setNumbersArr((numbersArr) => [...numbersArr, lottoData[i]]);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        margintop: 10,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button
          icon="qrcode"
          mode="contained"
          color="white"
          onPress={() => setScanned(false)}
          labelStyle={{ fontSize: 30 }}
        >
          다시 스캔하기
        </Button>
      )}
    </View>
  );
}

export default QrCode;
