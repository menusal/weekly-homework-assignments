import { animate } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 3,
      onUpdate(value) {
        // @ts-ignore
        node.textContent = `€${value.toFixed(2)}`;
      },
    });

    return () => controls.stop();
  }, [from, to]);
  // @ts-ignore
  return <p className="text-6xl p-6 text-center" ref={nodeRef} />;
}
