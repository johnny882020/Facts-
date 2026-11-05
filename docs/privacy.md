# Privacy

CloseGuard collects, stores off-device and transmits **no data**. There is no analytics, telemetry, remote code, or network request made by the extension.

Local only (`chrome.storage`): settings (enabled, generic mode, disabled hosts) and counters (closed total, reopened, errors, last-closed timestamp per adapter). Page content is read in memory to decide whether to click and is never stored or sent.

## Permissions
- `<all_urls>` content script: pop-ups appear on arbitrary sites; the extension must inspect the DOM there to find a close control. It reads and clicks only.
- `storage`: settings and local counters.
- No `tabs`, `webRequest`, `cookies`, `history`, `debugger`, or `scripting` permissions are used. (Update this list if the manifest changes.)
