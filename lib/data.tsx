import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"

  import { Status } from "@prisma/client"
  
export const statuses = [
    {
      value: Status.ORDERED,
      label: "Ordered",
      icon: CircleIcon,
    },
    {
      value: Status.INPROGRESS,
      label: "In Progress",
      icon: StopwatchIcon,
    },
    {
      value: Status.DELIVERED,
      label: "Delivered",
      icon: CheckCircledIcon,
    },
    {
      value: Status.CANCELLED,
      label: "Canceled",
      icon: CrossCircledIcon,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]