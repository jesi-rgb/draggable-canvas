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
  console.log("mierdon");
  const [lastTarget, setLastTarget] = useState<EventTarget | null>(null);
  let [items, setItems] = useState<string>();

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

    window.addEventListener("drop", async function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      hideWrapper();

      let file = e.dataTransfer?.files[0];
      let reader = new FileReader();
      // it's onload event and you forgot (parameters)
      reader.onload = function (e) {
        // the result image data
        setItems(e.target?.result as string);
        console.log(items);
      };
      // you have to declare the file loading
      if (file) reader.readAsDataURL(file as Blob);
    });
  });

  return items;
}
