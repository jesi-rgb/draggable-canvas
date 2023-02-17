import { FC, use, useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import { TextAlignLeft, TextAlignCenter, TextAlignRight } from "phosphor-react";

type TextProps = {
  text: string;
};

export const TextField: FC<TextProps> = (props: TextProps) => {
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center"
  );
  const [gridSpacing, setGridSpacing] = useState<number>(1);
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");

  const [fontSize, setFontSize] = useState<number>(14);

  const handleDrag = (e: DraggableEvent) => {
    if (e.shiftKey) {
      setGridSpacing(40);
    } else {
      setGridSpacing(1);
    }
  };

  return (
    <Draggable
      bounds="parent"
      grid={[gridSpacing, gridSpacing]}
      onDrag={(e: DraggableEvent) => handleDrag(e)}
      onStart={() => setCursor("grabbing")}
      onStop={() => setCursor("grab")}
      defaultPosition={{ x: 10, y: 10 }}
    >
      <div className="w-min group">
        <input
          type={"text"}
          placeholder={props.text}
          style={{ textAlign: textAlign, fontSize: fontSize }}
          className="group-hover:ring-1 group-hover:ring-red-400 font-bold font-sans"
        />
        <div className="flex justify-between">
          <div className="invisible relative text-xl group-hover:flex space-x-2 group-hover:visible">
            <span onClick={() => setFontSize(fontSize + 1)}>+</span>
            <span onClick={() => setFontSize(fontSize - 1)}>-</span>
          </div>
          <div className="invisible relative group-hover:flex space-x-2 text-xl group-hover:visible">
            <span onClick={() => setTextAlign("left")}>
              <TextAlignLeft />
            </span>
            <span onClick={() => setTextAlign("center")}>
              <TextAlignCenter />
            </span>
            <span onClick={() => setTextAlign("right")}>
              <TextAlignRight />
            </span>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
