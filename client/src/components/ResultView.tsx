const containerID = 'injected-div';

export const ResultView = ({ html, css }: { html: string; css: string }) => {
  return (
    <div
      className=""
      id={containerID}
      dangerouslySetInnerHTML={{
        __html: buildHtmlCss(html, css),
      }}
    ></div>
  );
};

function buildHtmlCss(html: string, css: string) {
  if (!html) return '';
  return `
        <style>
          #${containerID} {
            ${css}
          }
        </style>
        ${html}
  `;
}
