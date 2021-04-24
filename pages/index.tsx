import React, {useState} from "react";
import {Box, Heading, Link, Text, useToast, VStack} from "@chakra-ui/react";
import {FileUpload} from "../components/file-upload";
import {useForm} from "react-hook-form";
import {Button, FormControl, FormErrorMessage, Icon} from "@chakra-ui/react";
import {FiFile} from "react-icons/fi";
import {FormValues, VisionResponse} from "../utils/interfaces";

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
  const [results, setResults] = useState<VisionResponse>();
  const [image, setImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async data => {
    setLoading(true);
    const file = data.file[0];

    const formData = new FormData();
    const string = await toBase64(file);
    formData.set("image", string);

    const request = fetch("/api/roast", {
      method: "POST",
      body: formData,
    });

    request
      .then(res => res.json())
      .then(setResults)
      .finally(() => setLoading(false));
    setImage(string);
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

  function generateRoast() {
    let roasts: string[] = [];
    let descriptions: string[] = [];

    if (results) {
      results.labelAnnotations.map(ann => {
        descriptions.push(ann.description);
      });
    }

    if (descriptions.includes("Smile") && descriptions.includes("Glasses")) {
      roasts.push("What the fuck are you smiling about you speccy cunt.");
    }
    if (descriptions.includes("Pleased")) {
      roasts.push("You look as pleased as a peadophile in a playground.");
    }

    return roasts;
  }

  return (
    <Box textAlign="center" paddingTop="30px">
      <VStack spacing={5}>
        <Heading color="gray.700" size="4xl">
          plsroast.me
        </Heading>

        <Text>
          Yet another stupid project by{" "}
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
                  {results ? "Upload another selfie" : "Upload selfie"}
                </Button>
              </FileUpload>

              <FormErrorMessage>{errors.file && errors?.file.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" isLoading={loading}>
              Submit
            </Button>
          </Box>
        </form>
        {image && <img src={image} style={{maxHeight: 300, maxWidth: 300}} />}
        <div>{generateRoast()}</div>
      </VStack>
    </Box>
  );
}
