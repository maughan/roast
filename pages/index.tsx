import React, {useState} from "react";
import {Box, Heading, Link, Text, VStack} from "@chakra-ui/react";
import {FileUpload} from "../components/file-upload";
import {useForm} from "react-hook-form";
import {Button, FormControl, FormErrorMessage, Icon} from "@chakra-ui/react";
import {FiFile} from "react-icons/fi";

interface FormValues {
  file: FileList;
}

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<unknown>();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async data => {
    setLoading(true);
    const file = data.file[0];

    const formData = new FormData();
    formData.set("image", await toBase64(file));

    await fetch("/api/roast", {
      method: "POST",
      body: formData,
    })
      .then(x => x.json())
      .then(setData)
      .finally(() => setLoading(false));
  });

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return "File is required";
    }

    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;

      if (fsMb > MAX_FILE_SIZE) {
        return `Max file size ${MAX_FILE_SIZE}mb`;
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

        <Text>
          images are not stored on the server
          <br />
          we have no privacy policy 👍
        </Text>

        <form onSubmit={onSubmit}>
          <Box display="flex">
            <FormControl isInvalid={!!errors.file} isRequired isDisabled={loading}>
              <FileUpload
                accept="image/*"
                register={register("file", {validate: validateFiles})}
                loading={loading}
              >
                <Button disabled={loading} leftIcon={<Icon as={FiFile} />}>
                  Choose File
                </Button>
              </FileUpload>

              <FormErrorMessage>{errors.file && errors?.file.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" isLoading={loading}>
              Submit
            </Button>
          </Box>
        </form>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </VStack>
    </Box>
  );
}
