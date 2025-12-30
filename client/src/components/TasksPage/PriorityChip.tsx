type Priority = "high" | "medium" | "low";

const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

export default function PriorityChip({ priority }: { priority: Priority }) {
  return (
    <div className="flex items-center gap-2 ">
        <p className="text-sm text-muted-foreground" >Priority:</p>
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
    </div>
  );
}
