import { useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Flex
      direction="row"
      height="100vh"
      width="100vw"
      overflow="hidden"
      bg="black" // entire background black
      color="white"
    >
      {/* Left: Code Editor */}
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        bg="black"
        color="white"
        p={4}
        borderRight="1px solid #2d2d2d"
      >
        <Box mb={3}>
          <LanguageSelector language={language} onSelect={onSelect} />
        </Box>

        <Box flex="1" borderRadius="md" overflow="hidden">
          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              automaticLayout: true,
              scrollBeyondLastLine: false,
            }}
          />
        </Box>
      </Box>

      {/* Right: Output Section */}
      <Box
        flex="1"
        bg="#111" // darker black-gray for contrast
        color="white"
        p={6}
        overflowY="auto"
        borderLeft="1px solid #2d2d2d"
      >
        <Output editorRef={editorRef} language={language} />
      </Box>
    </Flex>
  );
};

export default CodeEditor;
