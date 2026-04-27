// plugins/remark-embed-plugin.js
const { visit } = require("unist-util-visit");

function convertGitHubBlobToRawUrl(url) {
  if (
    url.startsWith("https") &&
    url.includes("github.com") &&
    url.includes("/blob/")
  ) {
    return url
      .replace("github.com", "raw.githubusercontent.com")
      .replace("/blob/", "/"); // Ersetzt das '/blob/' Segment
  }
  if (!url.startsWith("https") && url.startsWith("/")) {
    const newurl = `https://raw.githubusercontent.com${url}`.replace(
      "/blob/",
      "/",
    ); // Ersetzt das '/blob/' Segment
    return newurl;
  }
  return url;
}

function convertGitHubToUrl(url) {
  if (url.startsWith("/"))
    return `https://github.com${url.replace("#", "?plain=1#")}`;
  return url.replace("#", "?plain=1#");
}

function detectLanguage(path) {
  const filename = path?.split("/").pop();
  if (filename?.endsWith("file")) {
    return path;
  } else if (filename.includes("file.")) {
    return filename?.split(".")[0];
  } else {
    return (
      {
        md: "markdown_inline",
        js: "javascript",
        ts: "typescript",
        java: "java",
        yaml: "yaml",
        yml: "yaml",
        json: "json",
      }[filename.split(".")?.[1]] || "text"
    );
  }
}

/**
 * Ein Remark-Plugin, das spezielle Blöcke findet und Code von GitHub abruft.
 */
function remarkEmbedPlugin() {
  // @ts-ignore
  const unified = this;

  return async (tree) => {
    const nodesToFetch = [];
    visit(tree, ["leafDirective"], (node, index, parent) => {
      if (node.name === "embed") {
        const url = node.attributes.url;
        const lang = node.attributes.lang;
        const nolink =
          node.attributes.nolink === "true" || node.attributes.nolink === "";
        const notitle =
          node.attributes.notitle === "true" || node.attributes.notitle === "";
        const title = node.children[0]?.value || undefined;

        if (url) {
          // Speichere auch parent und index, um das Element später korrekt einzufügen
          nodesToFetch.push({
            node,
            url,
            lang,
            title,
            nolink,
            notitle,
            parent,
            index,
          });
        }
      }
    });

    // 2. Führe alle Fetch-Operationen parallel aus und warte darauf
    await Promise.all(
      nodesToFetch.map(
        async ({ node, url, lang, title, nolink, notitle, parent, index }) => {
          try {
            const rawUrl = convertGitHubBlobToRawUrl(url);
            const response = await fetch(rawUrl);
            if (!response.ok) {
              throw new Error(
                `Failed to fetch code from ${rawUrl}: ${response.statusText}`,
              );
            }
            
            const codeContent = await response.text();
            console.log("rawUrl", rawUrl);
            console.log("content", codeContent);
            const lineContent = codeContent.split("\n");
            const path = url.split("#")[0];
            const hash = url.split("#")?.[1];
            const lines = hash
              ? hash.includes("-")
                ? hash.replaceAll("L", "").split("-")
                : [hash.replaceAll("L", ""), hash.replace("L", "")]
              : null;
            const linesToParse = lines
              ? lineContent
                  .slice(Number(lines[0] - 1), Number(lines[1]))
                  .join("\n")
              : codeContent;
            const githubLink =
              unified.parse(`<p style={{textAlign: "right", fontSize: "0.8em", color: "#666", marginTop: "5px"}}>
                <a href="${convertGitHubToUrl(url)}" target="_blank" rel="noopener noreferrer">Quelle</a>
              </p>`);

            if (lang === undefined) lang = detectLanguage(path);

            if (lang === "markdown_inline") {
              const embeddedTree = unified.parse(linesToParse);
              Object.assign(node, {
                name: undefined,
                attributes: undefined,
                children: embeddedTree.children.concat(
                  nolink ? [] : githubLink.children,
                ),
              });
            } else {
              const urlArray = rawUrl.split("/main");
              const filename = title ? title : urlArray[urlArray.length - 1];
              Object.assign(node, {
                type: "root",
                children: [
                  {
                    type: "code",
                    lang: lang,
                    value: linesToParse,
                    children: undefined,
                    name: undefined,
                    meta: notitle ? undefined : `title="${filename}"`,
                  },
                ].concat(nolink ? [] : githubLink.children),
              });
            }
          } catch (error) {
            console.error(`Error embed code for URL ${url}:`, error.message);
            // Ersetze durch einen Fehler-Kommentar im HTML
            Object.assign(node, {
              type: "html",
              value: `<!-- FAILED TO LOAD CODE FROM ${url} -->`,
              children: undefined,
              name: undefined,
              attributes: undefined,
            });
          }
        },
      ),
    );
  };
}

module.exports = remarkEmbedPlugin;
