import React from "react";
import {Box, Heading, Link, Text} from "@chakra-ui/layout";

export default function Home() {
  return (
    <Box textAlign="center" paddingTop="30px">
      <Heading size="4xl">Roast Me balls</Heading>
      <Text>
        Another stupid project by{" "}
        <Link color="blue.500" href="https://twitter.com/aabbccsmith">
          @aabbccsmith
        </Link>{" "}
        and{" "}
        <Link color="blue.500" href="https://twitter.com/rsjm_io">
          @rsjm_io
        </Link>
      </Text>
    </Box>
  );
}
