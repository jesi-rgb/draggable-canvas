import { FC, useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";

type ElementProps = {
  name: string;
};

export const Element: FC<ElementProps> = (props: ElementProps) => {
  const [gridSpacing, setGridSpacing] = useState<number>(1);
  const handleDrag = (e: DraggableEvent) => {
    if (e.shiftKey) {
      setGridSpacing(40);
      console.log("shit");
    } else {
      setGridSpacing(1);
    }
  };

  return (
    <Draggable
      bounds="parent"
      grid={[gridSpacing, gridSpacing]}
      onDrag={(e: DraggableEvent) => handleDrag(e)}
      defaultPosition={{ x: 10, y: 10 }}
    >
      <div className="p-3 border-red-400 bg-red-100 border-2 w-40 h-40 hover:cursor-grab ">
        <div className="text-center font-bold font-mono">{props.name}</div>
        <div className="w-20 h-20 mx-auto mt-5 border-2 bg-blue-100 border-blue-400 "></div>
      </div>
    </Draggable>
  );
};
