import type { LucideIcon } from "lucide-react";

export type ItemType = {
  title: string;
  icon: LucideIcon;
  path: string;
};

export type SidebarSecion = {
  group: string;
  items: Array<ItemType>
}
