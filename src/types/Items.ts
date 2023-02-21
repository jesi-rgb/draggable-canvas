import { FC } from "react";
import { DraggableEvent } from "react-draggable";

export type Position = {
  x: number;
  y: number;
};

export type ImportedImage = {
  imgData: string;
  dropPosition: Position;
};

export interface CanvasElement {
  id: string;
  position: Position;
  gridSpacing: number;
  handleDrag: (e: DraggableEvent) => void;
}

export class Item implements CanvasElement {
  id: string;
  position: Position;
  gridSpacing: number = 1;

  constructor(id: string, position: Position) {
    this.id = id;
    this.position = position;
  }

  handleDrag(e: DraggableEvent): void {
    if (e.shiftKey) {
      this.gridSpacing = 1;
    } else {
      this.gridSpacing = 40;
    }
  }
}
