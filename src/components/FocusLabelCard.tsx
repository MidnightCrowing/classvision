export function FocusLabelCard({ label, value, ...props}: {
  label: string
  value: string
}) {
  return (
    <div
      p="20px"
      flex="~ col items-start justify-center"
      gap="10px"
      truncate
      rounded-lg
      backdrop-blur-md
      shadow="md hover:lg"
      cursor-default
      transition="all 500 ease-in-out"
      {...props}
    >
      <div font-semibold mb-2>{label}</div>
      <div text-xl font-bold>{value}</div>
    </div>
  )
}
