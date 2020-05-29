import React, { useState, useEffect } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, DataTable } from "react-native-paper";

import QrData from "./QrData";

function QrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [numbersArr, setNumbersArr] = useState([]);

  //필요 변수
  const [currRound, setCurrRound] = useState(""); //회차 정보
  const [drwNoDate, setDrwNoDate] = useState(""); //회차 시행 날짜
  const [firstWinamnt, setFirstWinamnt] = useState(0); //1등 상금액
  const [firstPrzwnerCo, setFirstPrzwnerCo] = useState(0); // 1등 당첨자수
  const [drwtNo1, setDrwtNo1] = useState(""); //당첨번호1
  const [drwtNo2, setDrwtNo2] = useState(""); //당첨번호2
  const [drwtNo3, setDrwtNo3] = useState(""); //당첨번호3
  const [drwtNo4, setDrwtNo4] = useState(""); //당첨번호4
  const [drwtNo5, setDrwtNo5] = useState(""); //당첨번호5
  const [drwtNo6, setDrwtNo6] = useState(""); //당첨번호6
  const [bnusNo, setBnusNo] = useState(""); //보너스 당첨 번호

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setNumbersArr([]);
    let rndStr = data.split("=");
    let lottoData = rndStr[1].split("q");
    let tempRound = lottoData[0];
    let round = tempRound.replace(/(^0+)/, "");

    fetch(
      //`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=912`
    )
      .then((response) => response.json())
      .then((json) => {
        if (parseInt(json.drwtNo1) < 10) {
          setDrwtNo1("0" + json.drwtNo1);
        } else {
          setDrwtNo1(String(json.drwtNo1));
        }
        if (parseInt(json.drwtNo2) < 10) {
          setDrwtNo2("0" + json.drwtNo2);
        } else {
          setDrwtNo2(String(json.drwtNo2));
        }
        if (parseInt(json.drwtNo3) < 10) {
          setDrwtNo3("0" + json.drwtNo3);
        } else {
          setDrwtNo3(String(json.drwtNo3));
        }
        if (parseInt(json.drwtNo4) < 10) {
          setDrwtNo4("0" + json.drwtNo4);
        } else {
          setDrwtNo4(String(json.drwtNo4));
        }
        if (parseInt(json.drwtNo5) < 10) {
          setDrwtNo5("0" + json.drwtNo5);
        } else {
          setDrwtNo5(String(json.drwtNo5));
        }
        if (parseInt(json.drwtNo6) < 10) {
          setDrwtNo6("0" + json.drwtNo6);
        } else {
          setDrwtNo6(String(json.drwtNo6));
        }
        if (parseInt(json.bnusNo) < 10) {
          setBnusNo("0" + json.bnusNo);
        } else {
          setBnusNo(String(json.bnusNo));
        }
        setCurrRound(round);
      })
      .catch(function (error) {
        console.log(error);
      });

    for (let i = 1; i < lottoData.length; i++) {
      setNumbersArr((numbersArr) => [...numbersArr, lottoData[i]]);
    }

    setScanned(true);
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
        flex: 0.5,
        flexDirection: "column",
        justifyContent: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        margintop: 10,
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height * 0.8,
        }}
      />
      {!scanned && (
        <Button
          icon="qrcode"
          mode="contained"
          color="#778899"
          style={{ width: Dimensions.get("window").width }}
          labelStyle={{ fontSize: 30 }}
        >
          스캔 중...
        </Button>
      )}

      {scanned && (
        <Button
          icon="qrcode"
          mode="contained"
          color="white"
          style={{ width: Dimensions.get("window").width }}
          onPress={() => {
            setScanned(false);
          }}
          labelStyle={{ fontSize: 30 }}
        >
          다시 스캔하기
        </Button>
      )}
      {scanned &&
        drwtNo1 != "" &&
        drwtNo2 != "" &&
        drwtNo3 != "" &&
        drwtNo4 != "" &&
        drwtNo5 != "" &&
        drwtNo6 != "" &&
        bnusNo != "" && (
          <QrData
            drwtNo1={drwtNo1}
            drwtNo2={drwtNo2}
            drwtNo3={drwtNo3}
            drwtNo4={drwtNo4}
            drwtNo5={drwtNo5}
            drwtNo6={drwtNo6}
            bnusNo={bnusNo}
            game1={String(numbersArr[0])}
            game2={numbersArr.length > 1 ? String(numbersArr[1]) : ""}
            game3={numbersArr.length > 2 ? String(numbersArr[2]) : ""}
            game4={numbersArr.length > 3 ? String(numbersArr[3]) : ""}
            game5={numbersArr.length > 4 ? String(numbersArr[4]) : ""}
            scanned={scanned}
          ></QrData>
        )}
      {!scanned && (
        <QrData
          drwtNo1={""}
          drwtNo2={""}
          drwtNo3={""}
          drwtNo4={""}
          drwtNo5={""}
          drwtNo6={""}
          bnusNo={""}
          game1={""}
          game2={""}
          game3={""}
          game4={""}
          game5={""}
          scanned={scanned}
        ></QrData>
      )}
    </View>
  );
}

export default QrCode;
