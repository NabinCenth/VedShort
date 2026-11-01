const server_url = "https://vedshort.onrender.com";
// const server_url ="http://localhost:3000"
const urlInput = document.getElementById("url-input");
const msg = document.getElementById("form-message");
const card = document.getElementById("saved-link-card");
const linkEl = document.getElementById("saved-link-result");
const copyBtn = document.getElementById("copy-link-button");
const shortenButton = document.getElementById("shorten-button");
const shortenSpinner = document.getElementById("shorten-spinner");
let loading = false;
const sendData = async () => {
  try {
     if (loading) return;
  if (!urlInput.value.trim()) return;
    loading = true;
    shortenButton.disabled = loading;
    shortenButton.setAttribute("aria-busy", String(loading));
    shortenSpinner.hidden = !loading;

    const payload = {
      org_url: urlInput.value
    };
    const response = await fetch(`${server_url}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log("Data sent successfully", data);
    const shortUrl = `${server_url}/${data.short_id}`;

    // Populate and reveal the neobrutalism card
    linkEl.href = shortUrl;
    linkEl.textContent = shortUrl;
    card.hidden = false;
    msg.textContent = "";
    msg.removeAttribute("data-kind");

  } catch (err) {
    console.error("Error Occured:", err);
    card.hidden = true;
    msg.textContent = "Something went wrong. Is the server running?";
    msg.setAttribute("data-kind", "error");
  }
  finally {
    loading = false;
    shortenButton.disabled = loading;
    shortenButton.setAttribute("aria-busy", String(loading));
    shortenSpinner.hidden = !loading;
  }
};

// Copy button
copyBtn.addEventListener("click", () => {
  const url = linkEl.href;
  navigator.clipboard.writeText(url).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy link";
    }, 2000);
  });
});

shortenButton.addEventListener("click", (e) => {
  e.preventDefault();
  sendData();
});
