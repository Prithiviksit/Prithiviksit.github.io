let ready;
function loadElement(tag, properties) {
  return new Promise((resolve, reject) => {
    const element = Object.assign(document.createElement(tag), properties);
    element.onload = () => resolve();
    element.onerror = () => {
      element.remove();
      reject(
        new Error(
          "Math assets could not load. Reconnect and retry the lesson.",
        ),
      );
    };
    document.head.append(element);
  });
}

export function loadMath() {
  if (!ready) {
    const base = new URL("../assets/katex/", import.meta.url);
    ready = (async () => {
      await loadElement("link", {
        rel: "stylesheet",
        href: new URL("katex.min.css", base).href,
      });
      if (!window.katex)
        await loadElement("script", {
          src: new URL("katex.min.js", base).href,
        });
      if (!window.renderMathInElement)
        await loadElement("script", {
          src: new URL("auto-render.min.js", base).href,
        });
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

export function renderMath(root) {
  if (!root.textContent.includes("\\(") && !root.textContent.includes("$$"))
    return;
  if (!window.renderMathInElement)
    throw new Error("Math rendering was not initialized before the lesson.");
  window.renderMathInElement(root, {
    delimiters: [
      { left: "\\(", right: "\\)", display: false },
      { left: "$$", right: "$$", display: true },
    ],
    throwOnError: true,
    trust: false,
  });
}
