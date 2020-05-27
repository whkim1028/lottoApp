import React, { useEffect } from "react";
import { Surface, Text } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import QrCode from "./QrCode";

function Menu({ navigation }) {
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

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Surface style={setSurface("#ebeae4")}>
          <AntDesign name="qrcode" size={100} color="black" />
          <Text onPress={() => navigation.navigate("QRCODE")}>QR 코드</Text>
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
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    flex: 0.27,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Menu;
