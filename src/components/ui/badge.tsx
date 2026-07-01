import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default:
          "border-border bg-muted text-muted-foreground",
        primary:
          "border-primary/20 bg-primary/10 text-primary",
        outline: "border-border bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
