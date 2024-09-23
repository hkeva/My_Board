import { Form, Input as AntInput } from "antd";
import { useState } from "react";

interface InputProps {
  columnId: string;
  title: string;
  setListName: (columnId: string, val: string) => void;
}

const Input: React.FC<InputProps> = ({ title, columnId, setListName }) => {
  const [inputValue, setInputValue] = useState(title);

  const handleListTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = () => {
    if (inputValue.length > 15) return;
    else setListName(columnId, inputValue);
  };

  return (
    <Form className="mb-10" initialValues={{ title: title }}>
      <Form.Item
        name="title"
        rules={[
          { required: true, message: "Title is required!" },
          { max: 15, message: "Max 15 characters allowed!" },
        ]}
      >
        <AntInput
          placeholder="Enter title here"
          onChange={handleListTitleChange}
          onPressEnter={handleEnterPress}
        />
      </Form.Item>
    </Form>
  );
};

export default Input;
