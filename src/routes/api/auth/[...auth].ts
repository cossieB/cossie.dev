import { auth } from "~/utils/auth"; // path to your auth file
import { toSolidStartHandler } from "better-auth/solid-start";

export const { GET, POST } = toSolidStartHandler(auth);
