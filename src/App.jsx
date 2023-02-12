import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Modal } from "antd";
import useKeyboardShortcut from "./hooks/keyboardShortcut";

const App = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const keys = ["Meta", "K"];
  const handleKeyboardShortcut = useCallback(
    (keys) => {
      setModal1Open((open) => !open);
    },
    [setModal1Open]
  );
  useKeyboardShortcut(keys, handleKeyboardShortcut);

  const handleKeyDown = (event) => {
    console.log("User pressed: ", event.key);

    if (event.key === "Enter") {
      setModal1Open(false);
      setInputValue("");
      setModal2Open(true);
      console.log("Enter key pressed ✅");
    }
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if(modal1Open){
      inputRef.current.focus()
    }
  }, [modal1Open])

  return (
    <>
      <Modal
        style={{ top: 200 }}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={null}
        closable={false}
      >
        <input
          ref={inputRef}
          value={inputValue}
          type={"text"}
          onKeyDown={handleKeyDown}
          onChange={onInputChange}
          style={{
            width: "96%",
            height: 28,
            fontSize: 16,
            padding: "1px 8px",
          }}
        />
      </Modal>
      <Modal
        style={{ marginRight: "20px" }}
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
        closable={false}
      >
        <Card>
          <p>Card content</p>
        </Card>
        <Card>
          <p>Card content</p>
        </Card>
        <Card>
          <p>Card content</p>
        </Card>
      </Modal>
    </>
  );
};

export default App;
