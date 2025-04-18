(function () {
    let lastTradeCommand = "";

    // Create the floating button
    const btn = document.createElement("button");
    btn.innerText = "Paste /trade accept";
    btn.style.position = "fixed";
    btn.style.bottom = "80px";
    btn.style.right = "20px";
    btn.style.zIndex = 9999;
    btn.style.background = "#692c8c";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "10px";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "bold";
    btn.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    btn.style.display = "none"; // hide until a code is found
    document.body.appendChild(btn);

    // Try to find input field more flexibly
    function findChatInput() {
        return document.querySelector("input[type='text']");
    }

    // Button click logic
    btn.onclick = () => {
        const input = findChatInput();
        if (!input) {
            alert("Chat input field not found.");
            return;
        }

        if (lastTradeCommand) {
            input.value = lastTradeCommand + "a"; // add 'a' trick
            input.focus();
            console.log("Inserted:", input.value);
        }
    };

    // Mutation observer to detect new trade messages
    const observer = new MutationObserver(() => {
        const tradeMessages = document.getElementsByClassName("message trade");

        for (const msg of tradeMessages) {
            for (const child of msg.children) {
                if (child.innerText.includes("/trade accept ")) {
                    child.style.backgroundColor = "#692c8c";
                    if (!child._clickAttached) {
                        child._clickAttached = true;

                        child.addEventListener("click", () => {
                            const match = child.innerText.match(/\/trade accept \d+/);
                            if (match) {
                                lastTradeCommand = match[0];
                                btn.style.display = "block";
                            }
                        });
                    }
                }
            }
        }
    });

    observer.observe(document, { subtree: true, childList: true });
})();
