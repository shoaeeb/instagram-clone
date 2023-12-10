import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        value={inputs.email}
        placeholder={"Email"}
        type={"email"}
        fontSize={14}
        size={"sm"}
        _placeholder={{ color: "gray.100" }}
      />
      <Input
        onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
        value={inputs.userName}
        placeholder={"User Name"}
        type={"text"}
        fontSize={14}
        size={"sm"}
        _placeholder={{ color: "gray.100" }}
      />
      <Input
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        value={inputs.fullName}
        placeholder={"Full name"}
        type={"text"}
        fontSize={14}
        size={"sm"}
        _placeholder={{ color: "gray.100" }}
      />
      <InputGroup>
        <Input
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          placeholder={"Password"}
          type={showPassword ? "text" : "password"}
          fontSize={14}
          size={"sm"}
          _placeholder={{ color: "gray.100" }}
          value={inputs.password}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {" "}
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert borderRadius={6} status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        fontSize={14}
        colorScheme={"blue"}
        size={"sm"}
        onClick={() => signup(inputs)}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </>
  );
}

export default Signup;
