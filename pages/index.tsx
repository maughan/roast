import React from "react";
import {Box, Heading, Link, Text, VStack} from "@chakra-ui/react";
import {FileUpload} from "./components/file-upload";
import {useForm} from "react-hook-form";
import {Button, FormControl, FormErrorMessage, Icon} from "@chakra-ui/react";
import {FiFile} from "react-icons/fi";
import processImage from "./api/hello";

interface FormValues {
  file: FileList;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(data => console.log("On Submit: ", data));

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "Files is required";
    }

    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;

      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }

    return true;
  };

  return (
    <Box textAlign="center" paddingTop="30px">
      <VStack spacing={5}>
        <Heading color="gray.700" size="4xl">
          plsroast.me
        </Heading>
        <Text>
          Another stupid project by{" "}
          <Link color="blue.500" isExternal href="https://twitter.com/aabbccsmith">
            @aabbccsmith
          </Link>{" "}
          and{" "}
          <Link color="blue.500" isExternal href="https://twitter.com/rsjm_io">
            @rsjm_io
          </Link>
        </Text>

        <form onSubmit={onSubmit}>
          <Box display="flex">
            <FormControl isInvalid={!!errors.file} isRequired>
              <FileUpload
                accept="image/*"
                multiple
                register={register("file", {validate: validateFiles})}
              >
                <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
              </FileUpload>

              <FormErrorMessage>{errors.file && errors?.file.message}</FormErrorMessage>
            </FormControl>

            <Button
              onClick={async () => {
                await fetch("/api/hello", {method: "POST", body: ""});
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </VStack>
    </Box>
  );
}
