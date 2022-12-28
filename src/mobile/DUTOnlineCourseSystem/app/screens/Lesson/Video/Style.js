import { StyleSheet } from "react-native";
import {COLOR} from "../../../const/color";
export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 4,
  },
  button: {
    backgroundColor: "#024547",
    borderRadius: 8,
    width: "35%",
    color: "white",
    fontWeight: "600",
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btnList: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "20%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonCover: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  avatar: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    // height: 250,
    minHeight: 200,
    top: 0,
    backgroundColor:'black',
    width:'100%'
  },
  buttons: {
    margin: 16,
  },
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
  spaceBetweenComponent: {
    marginTop: 25,
  },
  text: {
    marginBottom: 12,
    color: "#024547",
    fontWeight: "700",
    fontSize: 18,
  },
  btnQuiz: {
    marginTop: 8,
    width: "100%",
    borderColor: COLOR.PRIMARY,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.WHITE,
    borderRadius: 8,
  },
});
