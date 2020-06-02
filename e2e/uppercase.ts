import { Selector } from "testcafe";

fixture`Transformations`.page`http://localhost:3000/`;

// test("Uppercase", async (t: any) => {
//   const input = Selector("#input", t);
//   await t.typeText(input, "ahoj");
//   const button = Selector("button[data-testid='btn-uppercase']", t);
//   await t.click(button);
//   const output = Selector("#output", t);
//   await t.expect(output.innerText).contains("AHOJ");
// });

test("Cow", async (t: any) => {
  const input = Selector("#input", t);
  await t.typeText(input, "ahoj");
  const button = Selector("button[data-testid='btn-cow']", t);
  await t.click(button);
  const output = Selector("#output", t);
  await t.expect(output.innerText).contains("ahoj"); // SCREENSHOT
});
