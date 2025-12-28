import React from "react";
import DocHeader from "../../doc/DocHeader/DocHeader";
import DocTableOfContents from "../../doc/DocTableOfContents/DocTableOfContents";
import DocChapter from "../../doc/DocChapter/DocChapter";
import DocScrollButton from "../../doc/DocScrollButton/DocScrollButton";
import DocWrapper from "../../doc/DocWrapper/DocWrapper";

export default function DocViewer({
  title,
  file,
  contents = [],
  chapters = [],
}) {
  return (
    <DocWrapper>
      <DocHeader title={title} file={file} />
      <DocTableOfContents contents={contents} />

      {chapters.map((chapter) => (
        <DocChapter
          key={chapter.id}
          id={chapter.id}
          titleKey={chapter.titleKey}
          content={chapter.content}
        />
      ))}

      <DocScrollButton />
    </DocWrapper>
  );
}
