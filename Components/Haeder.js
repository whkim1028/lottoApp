import React, { useState, useEffect } from "react";
import {
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import {
  Divider,
  Text,
  IconButton,
  Colors,
  Button,
  TouchableRipple,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

function Haeder(props) {
  const [amt, setAmt] = useState(props.firstWinamnt);

  //번호 스타일링
  const numbers = (data) => {
    let color = "";
    if (data < 11) {
      color = "#fcba03";
    } else if (data >= 11 && data < 21) {
      color = "#00cafc";
    } else if (data >= 21 && data < 31) {
      color = "#f20242";
    } else if (data >= 31 && data < 41) {
      color = "#8a8889";
    } else {
      color = "83e36d";
    }
    return color;
  };

  let testColor1 = numbers(props.drwtNo1);
  let testColor2 = numbers(props.drwtNo2);
  let testColor3 = numbers(props.drwtNo3);
  let testColor4 = numbers(props.drwtNo4);
  let testColor5 = numbers(props.drwtNo5);
  let testColor6 = numbers(props.drwtNo6);
  let testColor7 = numbers(props.bnusNo);

  const setNumbersStyle = (color) => {
    return {
      borderRadius:
        Math.round(
          Dimensions.get("window").width + Dimensions.get("window").height
        ) / 2,
      width: Dimensions.get("window").width * 0.1,
      height: Dimensions.get("window").width * 0.1,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 7,
      marginRight: 7,
      backgroundColor: color,
      borderWidth: 1.3,
      borderColor: "white",
    };
  };

  const circle = (data) => {
    let leftPosition = 0;
    if (data < 10) {
      leftPosition = 7;
    } else {
      leftPosition = 2;
    }
    return leftPosition;
  };

  let leftPosition1 = circle(props.drwtNo1);
  let leftPosition2 = circle(props.drwtNo2);
  let leftPosition3 = circle(props.drwtNo3);
  let leftPosition4 = circle(props.drwtNo4);
  let leftPosition5 = circle(props.drwtNo5);
  let leftPosition6 = circle(props.drwtNo6);
  let leftPosition7 = circle(props.bnusNo);

  const setCircleStyle = (leftPosition) => {
    //차이점 left 2(ten) 7(under)
    return {
      width: 25,
      height: 25,
      backgroundColor: "transparent",
      fontSize: 20,
      left: 7,
      marginBottom: 2,
      color: "white",
      fontWeight: "bold",
      left: leftPosition,
    };
  };

  return (
    <ImageBackground
      style={styles.currInfoArea}
      source={require("../source/headackgound.jpg")}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableRipple
          onPress={props.changeRoundBefore}
          rippleColor="rgba(0,0,0,.32)"
        >
          <AntDesign
            name="left"
            size={35}
            color="white"
            style={{ marginRight: 30, marginTop: 20 }}
          />
        </TouchableRipple>
        <View>
          <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
            {props.drwNoDate}
          </Text>
          <Text style={styles.headerText}>{props.currRound}회</Text>
        </View>
        <TouchableRipple
          onPress={props.changeRoundAfter}
          rippleColor="rgba(0,0,0,.32)"
        >
          <AntDesign
            name="right"
            size={35}
            color="white"
            style={{ marginLeft: 30, marginTop: 20 }}
            onPress={props.changeRoundAfter}
          />
        </TouchableRipple>
      </View>
      <Divider />
      <View style={styles.numbersView}>
        <TouchableHighlight style={setNumbersStyle(testColor1)}>
          <Text style={setCircleStyle(leftPosition1)}>{props.drwtNo1}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={setNumbersStyle(testColor2)}>
          <Text style={setCircleStyle(leftPosition2)}>{props.drwtNo2}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={setNumbersStyle(testColor3)}>
          <Text style={setCircleStyle(leftPosition3)}>{props.drwtNo3}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={setNumbersStyle(testColor4)}>
          <Text style={setCircleStyle(leftPosition4)}>{props.drwtNo4}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={setNumbersStyle(testColor5)}>
          <Text style={setCircleStyle(leftPosition5)}>{props.drwtNo5}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={setNumbersStyle(testColor6)}>
          <Text style={setCircleStyle(leftPosition6)}>{props.drwtNo6}</Text>
        </TouchableHighlight>

        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          {" "}
          +{" "}
        </Text>

        <TouchableHighlight style={setNumbersStyle(testColor7)}>
          <Text style={setCircleStyle(leftPosition7)}>{props.bnusNo}</Text>
        </TouchableHighlight>
      </View>
      <Divider />
      <View style={styles.currInfoAreaRows}>
        <Image
          style={{ width: 50, height: 50, marginRight: 5 }}
          source={require("../source/1stFirst.png")}
        />
        <Text style={{ fontSize: 20, fontWeight: "blod", color: "white" }}>
          {props.firstWinamnt} 원
        </Text>
      </View>
      <Divider />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  currInfoArea: {
    flex: 2,
    backgroundColor: "#e8e7e6",
    justifyContent: "center",
  },
  currInfoAreaRows: {
    flex: 0.5,
    padding: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
  },
  numbersView: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  numberCircle: {
    width: 25,
    height: 25,
    backgroundColor: "transparent",
    fontSize: 20,
    left: 7,
    marginBottom: 2,
    color: "white",
    fontWeight: "bold",
  },
  numberCircleUpToTen: {
    width: 25,
    height: 25,
    backgroundColor: "transparent",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    left: 2,
    marginBottom: 2,
  },
});

export default Haeder;
