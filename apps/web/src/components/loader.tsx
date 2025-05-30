import { Circle } from "lucide-react";

export default function Loader() {
  return (
    <div className="bg-base-1000 flex h-screen flex-col items-center justify-center gap-5">
      <Circle />
      <p className="text-muted-foreground text-xs leading-none tracking-tight">
        Loading...
      </p>
    </div>
  );
}
