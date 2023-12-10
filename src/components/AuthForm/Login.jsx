import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  return (
    <>
      <Input
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        value={inputs.email}
        placeholder={"Email"}
        type={"email"}
        fontSize={14}
        _placeholder={{ color: "gray.100" }}
        size={"sm"}
      />
      <Input
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        placeholder={"Password"}
        type={"password"}
        fontSize={14}
        _placeholder={{ color: "gray.100" }}
        size={"sm"}
      />

      <Button w={"full"} fontSize={14} colorScheme={"blue"} size={"sm"}>
        Login
      </Button>
    </>
  );
}

export default Login;
