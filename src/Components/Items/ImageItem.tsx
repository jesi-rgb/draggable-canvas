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
      <div>
        <Image
          decoding="sync"
          width={100}
          height={100}
          src={props.imageUrl}
          alt=""
        />
      </div>
    </Draggable>
  );
};
