import { useEffect, useState } from "react";
import { ImportedImage } from "@/types/Items";

function hideWrapper() {
  let element = document.querySelector("#wrapper") as HTMLElement;
  if (element) {
    element.style.visibility = "hidden";
    element.style.opacity = "0";
  }
}

function showWrapper() {
  let element = document.querySelector("#wrapper") as HTMLElement;
  if (element) {
    element.style.visibility = "";
    element.style.opacity = "0.2";
  }
}

export default function useDnD() {
  const [lastTarget, setLastTarget] = useState<EventTarget | null>(null);
  let [items, setItems] = useState<ImportedImage>();

  useEffect(() => {
    window.addEventListener("dragenter", function (e) {
      // drag start
      // unhide our red overlay
      showWrapper();
      setLastTarget(e.target);
    });

    window.addEventListener("dragleave", function (e) {
      // user canceled

      if (e.target === lastTarget || e.target === document) {
        hideWrapper();
      }
    });

    window.addEventListener("dragover", function (e) {
      //to stop default browser act
      e.preventDefault();
      e.stopImmediatePropagation();
    });

    window.addEventListener("drop", function (e) {
      e.preventDefault();
      hideWrapper();

      let file = e.dataTransfer?.files[0];
      let reader = new FileReader();

      reader.onload = function (reader) {
        const result = reader.target?.result as string;
        const dropPosition = {
          x: e.clientX,
          y: e.clientY,
        };
        setItems({ imgData: result, dropPosition: dropPosition });
      };

      if (file) reader.readAsDataURL(file as Blob);
    });
  });

  return items;
}
