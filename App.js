import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Surface, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Haeder from "./Components/Haeder";
import QrCode from "./Components/QrCode";

function Home({ navigation }) {
  const [returnValue, setReturnValue] = useState(""); //성공 여부
  const [currRound, setCurrRound] = useState(""); //회차 정보
  const [drwNoDate, setDrwNoDate] = useState(""); //회차 시행 날짜
  const [totSellamnt, setTotSellamnt] = useState(0); //상금 누적액
  const [firstWinamnt, setFirstWinamnt] = useState(0); //1등 상금액
  const [firstPrzwnerCo, setFirstPrzwnerCo] = useState(0); // 1등 당첨자수
  const [drwtNo1, setDrwtNo1] = useState(""); //당첨번호1
  const [drwtNo2, setDrwtNo2] = useState(""); //당첨번호2
  const [drwtNo3, setDrwtNo3] = useState(""); //당첨번호3
  const [drwtNo4, setDrwtNo4] = useState(""); //당첨번호4
  const [drwtNo5, setDrwtNo5] = useState(""); //당첨번호5
  const [drwtNo6, setDrwtNo6] = useState(""); //당첨번호6
  const [bnusNo, setBnusNo] = useState(""); //보너스 당첨 번호

  let ROUND = "911";
  const ROUND_DATE = new Date(2020, 5, 16);
  const CURR_DATE = new Date();

  const setSurface = (color) => {
    return {
      padding: 8,
      width: Dimensions.get("window").width * 0.29,
      height: Dimensions.get("window").height * 0.16,
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      marginTop: 10,

      backgroundColor: color,
    };
  };

  const changeRoundBefore = (currRound) => {
    let before = parseInt(currRound) - 1;
    fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${before}`
    )
      .then((response) => response.json())

      .then((json) => {
        setCurrRound(before);
        setDrwNoDate(json.drwNoDate);
        setFirstWinamnt(json.firstWinamnt.toLocaleString());
        setFirstPrzwnerCo(json.firstPrzwnerCo);
        setDrwtNo1(json.drwtNo1);
        setDrwtNo2(json.drwtNo2);
        setDrwtNo3(json.drwtNo3);
        setDrwtNo4(json.drwtNo4);
        setDrwtNo5(json.drwtNo5);
        setDrwtNo6(json.drwtNo6);
        setBnusNo(json.bnusNo);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const changeRoundAfter = (currRound) => {
    let after = parseInt(currRound) + 1;

    fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${after}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.returnValue == "fail") {
          let re = "";
          alert("최신 회차 정보입니다.");
          re = parseInt(after) - 1;
          fetch(
            `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${re}`
          )
            .then((response) => response.json())
            .then((json) => {
              setReturnValue(json.returnValue);
              setCurrRound(re);
              setDrwNoDate(json.drwNoDate);
              setFirstWinamnt(json.firstWinamnt.toLocaleString());
              setFirstPrzwnerCo(json.firstPrzwnerCo);
              setDrwtNo1(json.drwtNo1);
              setDrwtNo2(json.drwtNo2);
              setDrwtNo3(json.drwtNo3);
              setDrwtNo4(json.drwtNo4);
              setDrwtNo5(json.drwtNo5);
              setDrwtNo6(json.drwtNo6);
              setBnusNo(json.bnusNo);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setReturnValue(json.returnValue);
          setCurrRound(after);
          setDrwNoDate(json.drwNoDate);
          setFirstWinamnt(json.firstWinamnt.toLocaleString());
          setFirstPrzwnerCo(json.firstPrzwnerCo);
          setDrwtNo1(json.drwtNo1);
          setDrwtNo2(json.drwtNo2);
          setDrwtNo3(json.drwtNo3);
          setDrwtNo4(json.drwtNo4);
          setDrwtNo5(json.drwtNo5);
          setDrwtNo6(json.drwtNo6);
          setBnusNo(json.bnusNo);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let roundDate = new Date(
      ROUND_DATE.getFullYear(),
      ROUND_DATE.getMonth() + 1,
      ROUND_DATE.getDate()
    );

    let currDate = new Date(
      CURR_DATE.getFullYear(),
      CURR_DATE.getMonth() + 1,
      CURR_DATE.getDate()
    );

    //let diff = Math.abs(currDate.getTime() - roundDate.getTime());
    let diff = roundDate - currDate;

    diff = parseInt(diff / (1000 * 3600 * 24)) - 12;
    if (diff / 7 > 0) {
      ROUND = parseInt(ROUND) + parseInt(diff / 7);
    }

    fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${ROUND}`
    )
      .then((response) => response.json())

      .then((json) => {
        setCurrRound(ROUND);
        setDrwNoDate(json.drwNoDate);
        setFirstWinamnt(json.firstWinamnt.toLocaleString());
        setFirstPrzwnerCo(json.firstPrzwnerCo);
        setDrwtNo1(json.drwtNo1);
        setDrwtNo2(json.drwtNo2);
        setDrwtNo3(json.drwtNo3);
        setDrwtNo4(json.drwtNo4);
        setDrwtNo5(json.drwtNo5);
        setDrwtNo6(json.drwtNo6);
        setBnusNo(json.bnusNo);
        setLatestRound(praseInt(ROUND));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Haeder
        style={styles.haederStyle}
        drwtNo1={drwtNo1}
        drwtNo2={drwtNo2}
        drwtNo3={drwtNo3}
        drwtNo4={drwtNo4}
        drwtNo5={drwtNo5}
        drwtNo6={drwtNo6}
        bnusNo={bnusNo}
        drwNoDate={drwNoDate}
        currRound={currRound}
        firstWinamnt={firstWinamnt}
        changeRoundAfter={() => changeRoundAfter(currRound)}
        changeRoundBefore={() => changeRoundBefore(currRound)}
      ></Haeder>
      <View style={styles.menuInfoArea}>
        <View style={styles.container1}>
          <View style={styles.view}>
            <Surface
              onTouchEnd={() => navigation.navigate("QRCODE")}
              style={setSurface("#ebeae4")}
            >
              <AntDesign name="qrcode" size={100} color="black" />
              <Text>QR 코드</Text>
            </Surface>
            <Surface style={setSurface("#ebeae4")}>
              <AntDesign name="hourglass" size={100} color="black" />
              <Text>번호 생성기</Text>
            </Surface>
            <Surface style={setSurface("#ebeae4")}>
              <AntDesign name="dotchart" size={100} color="black" />
              <Text>당첨번호 통계</Text>
            </Surface>
          </View>
          <View style={styles.view}>
            <Surface style={setSurface("#ebeae4")}>
              <AntDesign name="isv" size={100} color="black" />
              <Text>내 주변 판매점</Text>
            </Surface>
            <Surface style={setSurface("#ebeae4")}>
              <AntDesign name="laptop" size={100} color="black" />
              <Text>번호 시뮬레이션</Text>
            </Surface>
            <Surface style={setSurface("#ebeae4")}>
              <Text>의견보내기</Text>
            </Surface>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuInfoArea: {
    flex: 6,
    backgroundColor: "white",
    alignItems: "center",
  },
  haederStyle: {
    flex: 4,
  },
  view: {
    flexDirection: "row",
    flex: 0.27,
  },
  container1: {
    flex: 1,
    alignItems: "center",
  },
});

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HOME" component={Home} />
        <Stack.Screen name="QRCODE" component={QrCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
