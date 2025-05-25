// /assets/js/formLogic.js

export function setFormRedirect() {
  const pageId = document.body.id;
  const redirectInput = document.querySelector('input[name="redirect"]');

  if (redirectInput && pageId) {
    redirectInput.value = `https://ohlonesky.com/thanks/index.html?from=${pageId}`;
  }
}

export function setThanksMessage() {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("from");

  const messages = {
    contact: "Thanks for reaching out — we’ll be in touch soon.",
    support: "Thank you for supporting Ohlone Sky. It truly helps!",
    donate: "Thank you for your donation — your generosity lifts this project skyward.",
    faqs: "Thanks for your question! We’ll update the FAQs if needed.",
    home: "Thanks for your interest in Ohlone Sky!"
  };

  const message = messages[source] || "Thanks for your message!";
  const messageEl = document.getElementById("thanksMessage");
  if (messageEl) messageEl.textContent = message;
}
