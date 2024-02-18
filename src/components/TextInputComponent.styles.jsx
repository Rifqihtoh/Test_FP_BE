import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const size = Dimensions.get("window");

export const stylesTextInput = {
  textInput: {
    fontSize: 14,
    flex: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    width: size.width - 42,
    padding: 14,
    borderRadius: 12,
  },
};
