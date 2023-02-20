import { useEffect, useState } from "react";

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
  const [items, setItems] = useState<DataTransferItemList>();
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
      e.stopImmediatePropagation();
      hideWrapper();

      // // if drop, we pass object file to dropzone
      console.log("got files from hook");
      setItems(e.dataTransfer?.items);
    });
  });
  return items;
}
