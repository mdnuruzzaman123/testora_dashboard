import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Image as ImageIcon,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";

const TOOL_GROUPS = [
  [
    { label: "H1", title: "Heading 1" },
    { label: "H2", title: "Heading 2" },
    { label: "H3", title: "Heading 3" },
    { label: "P",  title: "Paragraph" },
  ],
];

const ICON_TOOLS = [
  { icon: Bold,        title: "Bold" },
  { icon: Italic,      title: "Italic" },
  { icon: Underline,   title: "Underline" },
  { icon: Strikethrough, title: "Strikethrough" },
  { icon: AlignLeft,   title: "Align left" },
  { icon: AlignCenter, title: "Align center" },
  { icon: AlignRight,  title: "Align right" },
  { icon: AlignJustify,title: "Justify" },
  { icon: Link,        title: "Insert link" },
  { icon: ImageIcon,   title: "Insert image" },
];

export default function RichTextToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-md border border-[#dce7f2] bg-[#f8fbff] px-2 py-1.5">
      {/* Heading / paragraph text buttons */}
      {TOOL_GROUPS[0].map((t) => (
        <button
          key={t.label}
          type="button"
          title={t.title}
          className="flex h-7 w-7 items-center justify-center rounded text-xs font-bold text-[#587189] hover:bg-[#e6f0f9] hover:text-[#2f86d8]"
        >
          {t.label}
        </button>
      ))}

      <div className="mx-1 h-4 w-px bg-[#dce7f2]" />

      {/* Icon buttons */}
      {ICON_TOOLS.map((t) => (
        <button
          key={t.title}
          type="button"
          title={t.title}
          className="flex h-7 w-7 items-center justify-center rounded text-[#587189] hover:bg-[#e6f0f9] hover:text-[#2f86d8]"
        >
          <t.icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
