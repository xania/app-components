import { jsx, render, RenderTarget } from "@xania/view";

export class RendererDemo {
  get view() {
    return (
      <div style="padding: 10px;">
        <p>Make sure the elements appair in right order:</p>
        <div>div 1</div>
        {renderer("div 2")}
        <div>div 3</div>
        {renderer("div 4")}
        <div>div 5</div>
        <div>div 6</div>
      </div>
    );
  }
}

function renderer(text: string) {
  return {
    render(target: RenderTarget) {
      return render(<div>{text}</div>, target);
    },
  };
}
