import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = ({ children, styles }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  );
};

export default Container;
