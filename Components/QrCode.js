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

function QrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [numbersArr, setNumbersArr] = useState([]);
  const [winArr, setWinArr] = useState([]);

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
  const [winCnt, setWincnt] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setWincnt(0);
    setNumbersArr([]);
    let rndStr = data.split("=");
    let lottoData = rndStr[1].split("q");
    let tempRound = lottoData[0];
    let round = tempRound.replace(/(^0+)/, "");

    fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`
      // `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=912`
    )
      .then((response) => response.json())

      .then((json) => {
        if (parseInt(json.drwtNo1) < 10) {
          setDrwtNo1("0" + json.drwtNo1);
        } else {
          setDrwtNo1(json.drwtNo1);
        }
        if (parseInt(json.drwtNo2) < 10) {
          setDrwtNo2("0" + json.drwtNo2);
        } else {
          setDrwtNo2(json.drwtNo2);
        }
        if (parseInt(json.drwtNo3) < 10) {
          setDrwtNo3("0" + json.drwtNo3);
        } else {
          setDrwtNo3(json.drwtNo3);
        }
        if (parseInt(json.drwtNo4) < 10) {
          setDrwtNo4("0" + json.drwtNo4);
        } else {
          setDrwtNo4(json.drwtNo4);
        }
        if (parseInt(json.drwtNo5) < 10) {
          setDrwtNo5("0" + json.drwtNo5);
        } else {
          setDrwtNo5(json.drwtNo5);
        }
        if (parseInt(json.drwtNo6) < 10) {
          setDrwtNo6("0" + json.drwtNo6);
        } else {
          setDrwtNo6(json.drwtNo6);
        }
        if (parseInt(json.bnusNo) < 10) {
          setBnusNo("0" + json.bnusNo);
        } else {
          setBnusNo(json.bnusNo);
        }

        setCurrRound(round);
        setDrwNoDate(json.drwNoDate);
        setFirstWinamnt(json.firstWinamnt.toLocaleString());
        setFirstPrzwnerCo(json.firstPrzwnerCo);
        // setDrwtNo1(json.drwtNo1);
        // setDrwtNo2(json.drwtNo2);
        // setDrwtNo3(json.drwtNo3);
        // setDrwtNo4(json.drwtNo4);
        // setDrwtNo5(json.drwtNo5);
        // setDrwtNo6(json.drwtNo6);
        // setBnusNo(json.bnusNo);
      })
      .catch(function (error) {
        console.log(error);
      });

    for (let i = 1; i < lottoData.length; i++) {
      setNumbersArr((numbersArr) => [...numbersArr, lottoData[i]]);
    }

    for (let i = 0; i < numbersArr.length; i++) {
      for (let j = 0; j < 11; j + 2) {
        if (
          numbersArr[i].substr(j, 2) == drwtNo1 ||
          numbersArr[i].substr(j, 2) == drwtNo2 ||
          numbersArr[i].substr(j, 2) == drwtNo3 ||
          numbersArr[i].substr(j, 2) == drwtNo4 ||
          numbersArr[i].substr(j, 2) == drwtNo5 ||
          numbersArr[i].substr(j, 2) == drwtNo6
        ) {
          setWincnt(winCnt + 1);
        }
      }
      if (winCnt == 6) {
        setWinArr((winArr) => [...winArr, "1등"]);
      } else if (winCnt == 5) {
        setWinArr((winArr) => [...winArr, "3등"]);
      } else if (winCnt == 4) {
        setWinArr((winArr) => [...winArr, "4등"]);
      } else if (winCnt == 3) {
        setWinArr((winArr) => [...winArr, "5등"]);
      } else {
        setWinArr((winArr) => [...winArr, "꽝"]);
      }
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
          height: Dimensions.get("window").height * 0.6,
        }}
      />
      {!scanned && (
        <Button
          icon="qrcode"
          mode="contained"
          color="white"
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
          onPress={() => setScanned(false)}
          labelStyle={{ fontSize: 30 }}
        >
          다시 스캔하기
        </Button>
      )}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>순서</DataTable.Title>
          <DataTable.Title numeric>1</DataTable.Title>
          <DataTable.Title numeric>2</DataTable.Title>
          <DataTable.Title numeric>3</DataTable.Title>
          <DataTable.Title numeric>4</DataTable.Title>
          <DataTable.Title numeric>5</DataTable.Title>
          <DataTable.Title numeric>6</DataTable.Title>
          <DataTable.Title numeric> </DataTable.Title>
          <DataTable.Title numeric>보너스</DataTable.Title>
          <DataTable.Title numeric>당첨</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>1게임</DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[0].substr(0, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[0].substr(2, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[0].substr(4, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[0].substr(6, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[0].substr(8, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[0].substr(10, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric> {scanned ? "+" : ""} </DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? bnusNo : ""}</DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? winArr[0] : ""}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>2게임</DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[1].substr(0, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[1].substr(2, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[1].substr(4, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[1].substr(6, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[1].substr(8, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[1].substr(10, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric> {scanned ? "+" : ""} </DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? bnusNo : ""}</DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? winArr[1] : ""}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>3게임</DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[2].substr(0, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[2].substr(2, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[2].substr(4, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[2].substr(6, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[2].substr(8, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[2].substr(10, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric> {scanned ? "+" : ""} </DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? bnusNo : ""}</DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? winArr[2] : ""}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>4게임</DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[3].substr(0, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[3].substr(2, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[3].substr(4, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[3].substr(6, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[3].substr(8, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[3].substr(10, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric> {scanned ? "+" : ""} </DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? bnusNo : ""}</DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? winArr[3] : ""}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>5게임</DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[4].substr(0, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[4].substr(2, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[4].substr(4, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[4].substr(6, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[4].substr(8, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {scanned ? numbersArr[4].substr(10, 2) : ""}
          </DataTable.Cell>
          <DataTable.Cell numeric> {scanned ? "+" : ""} </DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? bnusNo : ""}</DataTable.Cell>
          <DataTable.Cell numeric>{scanned ? winArr[4] : ""}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

export default QrCode;
