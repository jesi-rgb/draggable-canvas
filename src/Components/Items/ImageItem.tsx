import Image from "next/image";
import { FC, useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";

type ImageProps = {
  imageUrl: string;
};

export const ImageItem: FC<ImageProps> = (props: ImageProps) => {
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");

  const [gridSpacing, setGridSpacing] = useState<number>(1);
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
      <div className="w-fit h-fit">
        <Image
          width={200}
          height={200}
          src={props.imageUrl}
          alt=""
          draggable={false}
        />
      </div>
    </Draggable>
  );
};
