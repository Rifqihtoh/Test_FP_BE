import { useMemo, useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Container from "../components/Container";
import TextInputComponent from "../components/TextInputComponent";
import TextComponent from "../components/TextComponent";
import { stylesTextInput } from "../components/TextInputComponent.styles";
import ButtonComponent from "../components/ButtonComponent";
// import { http } from "../../plugins/axios";
import axios from "axios";
import { API_URL } from "../../plugins/constants";
import { Feather } from "@expo/vector-icons";

const size = Dimensions.get("window");

const Register = ({ navigation }) => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(false);
  

  const handleShowPassword = () => {
    setShow((prev) => !prev);
  };

  // useEffect(() => {
  //   setFormData({
  //     ...formData,
  //     fullName: name,
  //     email,
  //     password,
  //     confirmPassword: passwordConfirmation
  //   })
  // })
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const isValidPassword = useMemo(
    () => formData.password && formData.confirmPassword && formData.password === formData.confirmPassword,
    [formData.password, formData.confirmPassword]
  );

  const isValidForm = useMemo(
    () => formData.fullName && formData.email && isValidPassword,
    [formData.fullName, formData.email, isValidPassword]
  );

  const handleRegister = async () => {
    try {
      setLoading(true);

      console.log({ formData });
      await axios.post(`${API_URL}/register`, formData);

      // setFormData({
      //   fullName: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });

      console.log(response.data?.data?.token ?? "");
      alert("create new user is successfully");

      navigation.replace("Login");
    } catch (error) {
      alert(error?.response?.data?.message ?? "");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      styles={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#53BF9D",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: size.width,
          paddingHorizontal: 24,
          paddingBottom: 8,
        }}
      >
        <TextComponent
          color="#fff"
          fontSize={36}
          fontWeight={"700"}
          letterSpacing={-1}
        >
          Buat Akun
        </TextComponent>

        <Image source={require("../../assets/gbk.png")} />
      </View>

      <View
        style={{
          width: size.width,
          height: size.height * 0.6,
          backgroundColor: "#fff",
          borderTopLeftRadius: 36,
          justifyContent: "center",
          borderTopRightRadius: 36,
          paddingTop: size.height * 0.04,
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            paddingHorizontal: 10,
            paddingBottom: 48,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            {/* name */}
            <View style={stylesTextInput.container}>
              <TextInput
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
                placeholder="Nama"
                style={stylesTextInput.textInput}
              />
            </View>

            <View style={{ marginVertical: 8 }} />

            {/* email */}
            <View style={stylesTextInput.container}>
              <TextInput
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                placeholder="Email"
                style={stylesTextInput.textInput}
              />
            </View>

            <View style={{ marginVertical: 8 }} />

            {/* password */}
            <View style={stylesTextInput.container}>
              <TextInput
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry={show}
                placeholder="password"
                style={stylesTextInput.textInput}
              />
              {show && (
                <TouchableOpacity onPress={handleShowPassword}>
                  <Feather
                    name={show ? "eye-off" : "eye"}
                    size={16}
                    color="#000"
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={{ marginVertical: 8 }} />

            {/* password confirmation */}
            <View style={stylesTextInput.container}>
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry={show}
                placeholder="konfirmasi password"
                style={stylesTextInput.textInput}
              />
              {show && (
                <TouchableOpacity onPress={handleShowPassword}>
                  <Feather
                    name={show ? "eye-off" : "eye"}
                    size={16}
                    color="#000"
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={{ marginVertical: 14 }} />

            <ButtonComponent
              label="Daftar"
              isLoading={loading}
              isDisable={!isValidForm}
              styles={{ backgroundColor: "#FFC54D" }}
              textStyles={{ color: "#fff", fontWeight: "600", fontSize: 18 }}
              onPress={handleRegister}
            />

            <View style={{ marginVertical: 8 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 14,
              }}
            >
              <TextComponent fontSize={14}>Sudah punya akun?</TextComponent>
              <View style={{ marginHorizontal: 3 }} />

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate("Login")}
              >
                <TextComponent
                  color="#53BF9D"
                  fontSize={14}
                  fontWeight={"bold"}
                >
                  Masuk
                </TextComponent>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Register;
