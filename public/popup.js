// Assume global scope has chrome, Blob
(function () {
  const messageElement = document.querySelector(".message");
  const contentElement = document.querySelector("#content");
  const loadingElement = document.querySelector(".loading");

  // Update message with important message
  messageElement.textContent = chrome.i18n.getMessage("important_message");

  function setMessageContent(messageKey) {
    messageElement.textContent = chrome.i18n.getMessage(messageKey);
  }

  function createDownloadButton(domain, cookies) {
    const button = document.createElement("button");
    button.textContent = chrome.i18n.getMessage("download_json");
    const link = document.createElement("a");
    link.setAttribute("download", `${domain}.cookies.json`);
    link.setAttribute(
      "href",
      URL.createObjectURL(
        new Blob([JSON.stringify(cookies, null, 2)], { type: "text/plain" })
      )
    );
    button.addEventListener("click", () => {
      link.click();
      setMessageContent("cookies_downloaded");
    });
    return button;
  }

  function createCopyButton(cookies) {
    const button = document.createElement("button");
    button.textContent = chrome.i18n.getMessage("copy_to_clipboard");
    button.addEventListener("click", () => {
      navigator.clipboard
        .writeText(JSON.stringify(cookies, null, 2))
        .then(() => {
          setMessageContent("cookies_copied");
        });
    });
    return button;
  }

  chrome.runtime.sendMessage("getCookies", (res) => {
    const { domain, cookies } = res;
    let resultElement = document.createElement(
      cookies && cookies.length ? "div" : "span"
    );
    if (!cookies || cookies.length === 0) {
      resultElement.textContent = chrome.i18n.getMessage("no_cookies");
    } else {
      resultElement.appendChild(createCopyButton(cookies));
      resultElement.appendChild(createDownloadButton(domain, cookies));
    }
    contentElement.removeChild(loadingElement);
    contentElement.appendChild(resultElement);
  });
})();
