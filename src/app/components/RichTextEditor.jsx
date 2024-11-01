import ReactQuill from "react-quill";

export default function RichTextEditor({
  content,
  placeholder,
  handleContentChange,
  theme = "snow",
  modules = RichTextEditor.modules
}) {
  return (
    <ReactQuill
      theme={theme}
      value={content}
      modules={modules}
      placeholder={placeholder}
      onChange={handleContentChange}
      formats={RichTextEditor.formats}
    />
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
RichTextEditor.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block", "link"],

    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["image", "video"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true
  }
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
RichTextEditor.formats = [
  "align",
  "background",
  "bold",
  "blockquote",
  "bullet",
  "color",
  "code",
  "code-block",
  "clean",
  "direction",
  "font",
  "header",
  "italic",
  "indent",
  "image",
  "list",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "video"
];
