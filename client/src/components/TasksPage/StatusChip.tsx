type Status = "pending" | "completed";

const statusStyles: Record<Status, string> = {
  pending: "bg-red-100 text-gray-700",
  completed: "bg-green-100 text-green-700",
};

export default function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
