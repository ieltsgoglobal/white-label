import {
  Tag,
  Users,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  DollarSign,
  PenLine,
  Handshake,
  CalendarDays,
  Keyboard
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
          label: "IELTS Mock Tests",
          icon: Bookmark
        },
        {
          href: "/mock-scores",
          label: "Mock Tests Review",
          icon: Tag
        },
        {
          href: "/practice-sets",
          label: "Sectional Practice",
          icon: PenLine
        },
        {
          href: "/coaching-batches",
          label: "Coaching Batches",
          icon: CalendarDays
        },
      ]
    },
    {
      groupLabel: "Tools",
      menus: [
        {
          href: "",
          label: "IELTS Tools",
          icon: Keyboard,
          submenus: [
            {
              href: "/ielts-typing-practice",
              label: "IELTS Typing Tool"
            },
            {
              href: "/vocab-battle",
              label: "Vocab Battle"
            },
            {
              href: "/vocab-ladder",
              label: "Vocabulary Practice"
            }
          ]
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/become-partner",
          label: "Become Partner",
          icon: Handshake
        },
        {
          href: "/contact",
          label: "Contact",
          icon: Users
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
