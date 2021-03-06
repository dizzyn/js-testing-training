import { Request, Response } from "express";
// @ts-ignore
import cowsay from "cowsay";
// @ts-ignore
import text2png from "text2png";

export function uppercase(str: string) {
  return String(str).toUpperCase();
}

export function cow(str: string) {
  return cowsay.say({
    text: str,
  });
}

export function image(str: string) {
  return text2png(cow(str), { color: "white" });
}

export default function api(req: Request, res: Response) {
  const action = req.query.action;
  const str = req.query.str as string;

  if (!str) {
    res.status(400);
    res.send(`str not given`);
    return;
  }

  if (!action) {
    res.status(400);
    res.send(`action not given`);
    return;
  }

  if (action === "uppercase") {
    res.send(uppercase(str));
  } else if (action === "cow") {
    res.send(cow(str));
  } else if (action === "image") {
    res.set("Content-Type", "image/png");
    res.send(image(str));
  } else {
    res.status(400);
    res.send(`Unknown action '${action}'`);
    return;
  }
}
