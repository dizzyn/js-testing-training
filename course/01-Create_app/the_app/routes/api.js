import cowsay from "cowsay";

export function uppercase(str) {
  return String(str).toUpperCase();
}

export function cow(str) {
  return cowsay.say({
    text: str,
  });
}

export default function api(req, res) {
  const action = req.query.action;
  const str = req.query.str;

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
  } else {
    res.status(400);
    res.send(`Unknown action '${action}'`);
    return;
  }
}
