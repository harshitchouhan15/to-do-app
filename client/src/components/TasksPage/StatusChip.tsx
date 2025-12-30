type Status = "todo" | "in-progress" | "completed";

const statusStyles: Record<Status, string> = {
  todo: "bg-red-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status === "in-progress" ? "In Progress" : status}
    </span>
  );
}
