import "./style.scss";

interface DropZoneProps {
  callback: (files: FileList) => void;
}
export function DropZone(props: DropZoneProps) {
  return {
    render: initializeDragZone(props.callback),
  };
}

export const initializeDragZone =
  (onAddFiles: (files) => any) => (container: Element) => {
    container.classList.add("drop-zone");
    container.addEventListener(
      "dragenter",
      function (enter): boolean | void {
        if (enter.target !== container) {
          console.log("enter again!", new Date().getTime());
          return false;
        }

        enter.preventDefault();
        enter.stopPropagation();

        container.classList.add("drop-zone--drag-enter");

        container.addEventListener("dragleave", dragleave, false);
        container.addEventListener("dragover", dragover, false);
        container.addEventListener("drop", dragdrop, false);

        function dragover(over) {
          container.classList.add("drop-zone--drag-over");

          over.preventDefault();
          over.stopPropagation();
        }

        function dragleave(leave) {
          leave.preventDefault();
          leave.stopPropagation();
          dispose();
        }

        function dragdrop(drop) {
          drop.preventDefault();
          drop.stopPropagation();

          const droppedFiles = drop.dataTransfer.files;
          onAddFiles(droppedFiles);

          dispose();
        }

        function dispose() {
          container.classList.remove("drop-zone--drag-over");
          container.classList.remove("drop-zone--drag-enter");

          container.removeEventListener("dragover", dragover);
          container.removeEventListener("dragleave", dragleave);
          container.removeEventListener("drop", dragdrop);
        }
      },
      false
    );
  };
