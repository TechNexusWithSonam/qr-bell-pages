import json
from pathlib import Path
p = Path(r'C:\Users\sonam\AppData\Roaming\Code\User\workspaceStorage\154d9063a8dc8323b13d7161ab56e2be\GitHub.copilot-chat\chat-session-resources\473e11db-7a84-4adf-b069-1f03b6d01891\call_AWvcFcEvKeZpDGZUR3TheFAn__vscode-1781094249085\content.txt')
text = p.read_text()
data = json.loads(text)
out = Path(r'c:\wamp64\www\qr-bell-pages\rendered_screenshot.png')
out.write_bytes(bytes(data['data']))
print(out)
