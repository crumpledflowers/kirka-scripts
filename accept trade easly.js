(function () {
    function findChatInput() {
        return document.querySelector("input[type='text']");
    }

    let lastTradeCode = null;

    const observer = new MutationObserver(() => {
        const tradeMessages = document.getElementsByClassName("message trade");

        for (const msg of tradeMessages) {
            for (const child of msg.children) {
                if (child.innerText.includes("/trade accept ")) {
                    child.style.backgroundColor = "#692c8c";
                    child.style.cursor = "pointer";

                    if (!child._clickAttached) {
                        child._clickAttached = true;

                        child.addEventListener("click", () => {
                            const match = child.innerText.match(/\/trade accept (\d+)/);
                            if (match) {
                                const code = match[1];
                                const input = findChatInput();

                                if (input) {
                                    lastTradeCode = code;
                                    input.value = `/trade accept ${code}a`; // "a" for accept
                                    input.focus();
                                } else {
                                    alert("Input field not found");
                                }
                            }
                        });
                    }
                }
            }
        }
    });

    observer.observe(document, { subtree: true, childList: true });

    document.addEventListener("keydown", (e) => {
        const input = findChatInput();

        if (e.key === "Enter" && input && input.value.includes("/trade accept") && lastTradeCode) {
            setTimeout(() => {
                input.value = `/trade confirm ${lastTradeCode}q`; // "q" for confirm
                input.focus();
            }, 100);
        }
    });
})();
