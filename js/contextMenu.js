export async function copyText() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        await navigator.clipboard.writeText(selectedText);
    }
}

export async function pasteText() {
    const activeEl = document.activeElement;
    if (!activeEl) return;

    // Check if it's a traditional text field, or if it's an element explicitly set to editable
    const isStandardInput = activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA";
    const isContentEditable = activeEl.hasAttribute("contenteditable") && activeEl.getAttribute("contenteditable") !== "false";

    if (!isStandardInput && !isContentEditable) {
        console.warn("The active element is not editable.");
        return;
    }

    try {
        const text = await navigator.clipboard.readText();
        if (!text) return;

        // Code for form inputs
        if (isStandardInput) {
            const start = activeEl.selectionStart;
            const end = activeEl.selectionEnd;
            const currentValue = activeEl.value;

            activeEl.value = currentValue.substring(0, start) + text + currentValue.substring(end);
            activeEl.focus();
            activeEl.setSelectionRange(start + text.length, start + text.length);
        } 
        // Code for contentEdible enabled tags like the p tag in notepad
        else if (isContentEditable) {
            activeEl.focus();
            
            // Get the current text insertion cursor position
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            
            const range = selection.getRangeAt(0);
            
            // Delete any text the user currently has highlighted/selected
            range.deleteContents();
            
            // Create a text node with the clipboard text and inject it precisely at the cursor location
            const textNode = document.createTextNode(text);
            range.insertNode(textNode);
            
            // Move the blinking text cursor immediately to the end of the newly pasted text
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    } catch (err) {
        console.error("Paste failed:", err);
    }
}