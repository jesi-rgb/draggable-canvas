import Image from "next/image";
import { FC, useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";

import { ImportedImage, Item } from "@/types/Items";

export const ImageItem: FC<ImportedImage> = (props: ImportedImage) => {
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
      defaultPosition={props.dropPosition}
    >
      <div className="w-fit h-fit">
        <Image
          decoding="sync"
          width={200}
          height={200}
          src={props.imgData}
          alt=""
          draggable={false}
        />
      </div>
    </Draggable>
  );
};
