import { n, nhttp, renderToHtml, serveStatic, cors } from "./deps.ts";
import Home from "./components/home.tsx";
import Meet from "./components/meet.tsx";
import { RequestEvent, TObject } from "https://deno.land/x/nhttp@1.3.7/mod.ts";
import { NHttp } from "https://deno.land/x/nhttp@1.3.7/index.ts";
import {
  getPeers,
  getRoom,
  joinOrCreateRoom,
  resetPeers,
} from "./room.controller.ts";
import { wsHandlers } from "./ws.controller.ts";

const ARGS: string[] = Deno.args ?? [];
const isDev: boolean = ARGS.includes("--dev");

const app = nhttp();

app.use("/assets", serveStatic("public"));
app.use(cors());
app.engine(renderToHtml);

app.post("/api/join-or-create", joinOrCreateRoom);
app.get("/peers", getPeers);
app.get("/peersr", resetPeers);
app.get("/room/:room", getRoom);
app.get("/ws/:token", wsHandlers);

app.get("/meet", ({ params }) => <Meet isDev={isDev} />);

export default app;
