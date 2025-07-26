import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  DollarSign
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/practice",
          label: "Try a Mock",
          icon: Bookmark
        },
        {
          href: "/mock-scores",
          label: "Assessment Scores",
          icon: Tag
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/contact",
          label: "Contact",
          icon: Users
        },
        {
          href: "/pricing",
          label: "Pricing",
          icon: DollarSign
        },
        {
          href: "",
          label: "Policies",
          icon: SquarePen,
          submenus: [
            {
              href: "/policies/privacy",
              label: "Privacy Policy"
            },
            {
              href: "/policies/return",
              label: "Return Policy"
            },
            {
              href: "/policies/refund",
              label: "Refund Policy"
            },
            {
              href: "/terms-conditions",
              label: "Terms & Conditions"
            }
          ]
        },
      ]
    }
  ];
}
