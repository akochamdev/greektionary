import { useState } from 'react';
import './App.css';
import {Box, Button, Flex, Heading, Text, TextArea} from "@radix-ui/themes";

function App() {
    const [textInput, setTextInput] = useState("");
    const [textOutput, setTextOutput] = useState("");

    const translate = () => {
        console.log(`Inside translate with textInput: ${textInput}`);
        // TODO: Call translate API and setTextOutput based on response
        setTextOutput(textInput);
    };

    const handleWordClick = (word: string) => {
        console.log(`Inside handleWordClick with word: ${word}`);
    };

    return (
      <Flex
          className="flexRoot"
          direction="column"
          align="stretch"
          gap="2"
          style={{ background: "lightgray" }}>
          <Box style={{ background: "crimson" }}>
              <Heading mb="1" size="7">Greektionary</Heading>
          </Box>
          <Box flexGrow="1" style={{ background: "beige" }}>
              <TextArea
                  className="textInput"
                  size="3"
                  resize="none"
                  placeholder="Enter text"
                  onChange={e => setTextInput(e.target.value)}/>
          </Box>
          <Box style={{ background: "lightcyan" }}>
              <Button onClick={translate}>
                  Translate
              </Button>
          </Box>
          <Box flexBasis="50%" style={{ background: "azure" }}>
              <Box
                  className="textOutput"
                  style={{ background: "darkorange"}}>
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
