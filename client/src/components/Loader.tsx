import { Loader2 } from "lucide-react";

export default function Loader({
  type="page"
}: {
//   text?: string;
  type?:"root"|"page"
}) {
  return type==='page'? (
      <div className="flex h-screen w-full absolute justify-center items-center gap-3">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
  ):(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <img className=" w-16 h-16 animate-float" src="/vite.svg" />
      </div>
    </div>

  );
}
