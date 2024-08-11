import { useState } from 'react';
import * as axios from "axios";
import './App.css';
import { Box, Button, Flex, Heading, Text, TextArea } from "@radix-ui/themes";

function App() {
    const [textInput, setTextInput] = useState("");
    const [textOutput, setTextOutput] = useState("");

    const translateText = async () => {
        if (!textInput) {
            return;
        }

        const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}`;
        const data = {
            q: textInput,
            source: "en",
            target: "el",
            format: "text"
        };
        const result = await axios.default.post(url, data);
        if (result?.status === 200 && result?.data?.data?.translations?.length > 0) {
            setTextOutput(result.data.data.translations[0].translatedText);
        } else {
            console.error(`Received error from translate API (${result?.status}): `, result);
        }
    };

    const handleWordClick = (word: string) => {
        window.open(`https://en.wiktionary.org/wiki/${word}`);
    };

    return (
      <Flex
          className="flexRoot"
          direction="column"
          align="stretch"
          gap="5">
          <Box>
              <Heading mb="1" size="7">Greektionary</Heading>
          </Box>
          <Box flexGrow="1">
              <TextArea
                  className="textInput"
                  size="3"
                  resize="none"
                  placeholder="Enter text"
                  onChange={e => setTextInput(e.target.value)}/>
          </Box>
          <Box>
              <Button onClick={translateText}>
                  Translate
              </Button>
          </Box>
          <Box flexBasis="50%">
              <Box className="textOutput">
                  <Flex
                      className="wordItems"
                      gap="2"
                      wrap="wrap">
                      {textOutput && textOutput.split(" ").map((val, index) => {
                          return (
                              <Text
                                  key={index}
                                  size="6"
                                  onClick={() => handleWordClick(val)}>
                                  {val}
                              </Text>
                          );
                      })}
                  </Flex>
              </Box>
          </Box>
      </Flex>
    )
}

export default App
