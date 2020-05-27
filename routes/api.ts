import { Request, Response } from "express";
// @ts-ignore
import cowsay from "cowsay";
// @ts-ignore
import text2png from "text2png";

export function uppercase(str: string) {
  return String(str).toUpperCase();
}

export function asciiart(str: string) {
  return cowsay.say({
    text: str,
  });
}

export function image(str: string) {
  return String(str).toUpperCase();
}

export default function api(req: Request, res: Response) {
  const action = req.query.action;
  const format = req.query.format;
  const str = req.query.str as string;

  if (!str) {
    res.status(400);
    res.send(`str not given`);
    return;
  }

  if (!format) {
    res.status(400);
    res.send(`format not given`);
    return;
  }

  if (!action) {
    res.status(400);
    res.send(`action not given`);
    return;
  }

  let newStr;

  if (action === "uppercase") {
    newStr = uppercase(str);
  } else if (action === "asciiart") {
    newStr = asciiart(str);
  } else {
    res.status(400);
    res.send(`Not allowed action '${action}'`);
    return;
  }

  if (format === "string") {
    res.send(newStr);
  } else if (format === "image") {
    res.set("Content-Type", "image/png");
    res.send(text2png(newStr, { color: "white" }));
  } else {
    res.status(400);
    res.send(`Not allowed format '${action}'`);
    return;
  }
}
