import { HandEye } from "phosphor-react";
import { FC, useEffect, useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";

type EffectProps = {
  name: string;
};

export const Effect: FC<EffectProps> = (props: EffectProps) => {
  const [gridSpacing, setGridSpacing] = useState<number>(1);
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");
  const [editable, setEditable] = useState<boolean>(false);

  const handleDrag = (e: DraggableEvent) => {
    if (e.shiftKey) {
      setGridSpacing(40);
    } else {
      setGridSpacing(1);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    // e.stopImmediatePropagation();
    setEditable(false);
  };

  const handleDblClick = (e: MouseEvent) => {
    console.log(e);
    setEditable(true);
    const element = e.target as HTMLElement;
    element.focus();
  };

  const handleKeyDownExit = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      console.log("keydown");
      setEditable(false);
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
      <div
        suppressContentEditableWarning={true}
        onMouseDown={(e) => handleMouseDown(e as any as MouseEvent)}
        onDoubleClick={(e) => handleDblClick(e as any as MouseEvent)}
        onKeyDown={(e) => handleKeyDownExit(e as any as KeyboardEvent)}
        contentEditable={editable}
        style={{ cursor: cursor }}
        className="p-3 border-red-400 bg-red-100 border-2 text-center w-min rounded-xl font-bold font-mono"
      >
        {props.name}
      </div>
    </Draggable>
  );
};
