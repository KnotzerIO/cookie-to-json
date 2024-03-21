/* global chrome, Blob */
document.querySelector(".message").textContent =
  chrome.i18n.getMessage("important_message");

chrome.runtime.sendMessage("getCookies", (res) => {
  const { domain, cookies } = res;
  const $content = document.querySelector("#content");
  let $result = null;
  if (!cookies || cookies.length === 0) {
    $result = document.createElement("span");
    $result.textContent = chrome.i18n.getMessage("no_cookies");
  } else {
    $result = document.createElement("button");
    $result.textContent = chrome.i18n.getMessage("download_json");
    const downloadLink = document.createElement("a");

    downloadLink.setAttribute("download", `${domain}.cookies.json`);
    downloadLink.setAttribute(
      "href",
      URL.createObjectURL(
        new Blob([JSON.stringify(cookies, null, 2)], { type: "text/plain" })
      )
    );
    $result.addEventListener("click", function () {
      document.querySelector(".message").textContent = "";
      let i = 0;
      const encryptionInterval = setInterval(() => {
        document.querySelector(".message").textContent += Math.random()
          .toString(36)
          .substring(2, 3);
        let breakWord = Math.floor(Math.random() * (10 - 5 + 1) + 5);
        if (i % breakWord === 0) {
          document.querySelector(".message").textContent += " ";
        }

        i++;
        if (i > 105) {
          clearInterval(encryptionInterval);
          // After the animation, show "Cookies Saved"
          setTimeout(() => {
            document.querySelector(".message").textContent =
              chrome.i18n.getMessage("cookies_exported");
            downloadLink.click();
          }, 500);
        }
      }, 20);
    });
  }
  $content.removeChild(document.querySelector(".loading"));
  $content.appendChild($result);
  s;
});
/*
    const copyButton = document.createElement("button");
        const copyLink = document.createElement("a");
    copyLink.setAttribute("href", "javascript:void(0)");
    copyButton.textContent = chrome.i18n.getMessage("copy_to_clipboard");
    copyButton.addEventListener("click", function () {
      const encryptionInterval = setInterval(() => {
        document.querySelector(".message").textContent += Math.random()
          .toString(36)
          .substring(2, 3);
        let breakWord = Math.floor(Math.random() * (10 - 5 + 1) + 5);
        if (i % breakWord === 0) {
          document.querySelector(".message").textContent += " ";
        }

        i++;
        if (i > 105) {
          clearInterval(encryptionInterval);
          // After the animation, show "Cookies Saved"
          setTimeout(() => {
            document.querySelector(".message").textContent =
              chrome.i18n.getMessage("cookies_copied");
            navigator.clipboard.writeText(JSON.stringify(cookies, null, 2));
          }, 500);
        }
      }, 20);
    });
*/
