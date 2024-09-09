# Code in the dark 👨🏼‍💻🌚

To get started, run:

```
pnpm install
pnpm dev
```

## Sequence diagram

```mermaid
sequenceDiagram

Host->>Server:Create new event
Server->>Host:Receive invite link / "game code" and connect socket
Host-->>Client(s):Share link / code
Client(s)->>Server:Join
Server->>Host:Inform on join
Client(s)->>Server:Write css/html ("code")
Server->>Host:Update code
Host->>Server:Toggle "darkness"
Server->>Client(s):Toggle "darkness"
```

**Host**:
is a web client that connects to the server to create and event, the host can later overview the attendants at the event and admin over them.

**Client(s)**:
The attendants at the event, that "code's in the dark

**Server**:
Some server that preferably are using sockets for live updating of code.
