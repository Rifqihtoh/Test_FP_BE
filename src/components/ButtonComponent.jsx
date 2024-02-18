import { TouchableOpacity, Text, Dimensions } from "react-native";

const size = Dimensions.get("window");

const ButtonComponent = ({
  label,
  onPress,
  styles,
  textStyles,
  isLoading,
  isDisable,
}) => {
  const handlePress = () => {
    if (!isDisable && !isLoading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        ...styles,
        width: size.width - 42,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: isDisable ? "#D9D9D9" : styles.backgroundColor,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          ...textStyles,
          textAlign: "center",
        }}
      >
        {isLoading && !isDisable ? "Loading..." : label}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
