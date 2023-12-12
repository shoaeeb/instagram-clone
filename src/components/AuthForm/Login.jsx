import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

function Login() {
  const { loading, error, login } = useLogin();
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
      {error && (
        <Alert borderRadius={6} status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        onClick={() => login(inputs)}
        fontSize={14}
        colorScheme={"blue"}
        size={"sm"}
        isLoading={loading}
      >
        Login
      </Button>
    </>
  );
}

export default Login;
