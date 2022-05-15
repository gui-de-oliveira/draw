import { useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };

function drawCircle({
  context,
  position,
  radius,
}: {
  context: CanvasRenderingContext2D;
  position: Position;
  radius: number;
}) {
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  context.stroke();
}

type State = { nodes: Position[] };

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [state] = useState<State>({ nodes: [{ x: 25, y: 25 }] });

  useEffect(() => {
    if (canvasRef === null) return;
    if (canvasRef.current === null) return;

    const context = canvasRef.current.getContext("2d");
    if (context === null) return;

    draw(context, state);
  }, [canvasRef, state]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid black", margin: 5 }}
      />
    </div>
  );
}

export default App;

function draw(context: CanvasRenderingContext2D, state: State) {
  state.nodes.forEach((node) => {
    drawCircle({ context, position: node, radius: 10 });
  });
}
