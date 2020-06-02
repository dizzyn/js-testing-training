import api, { uppercase, cow, image } from "./api";
import { Request, Response } from "express";

it("uppercase", () => {
  expect(uppercase("A")).toBe("A");
  expect(uppercase("a")).toBe("A");
});

it("cow", () => {
  expect(cow("A")).toMatchSnapshot();
});

function testAPI(params: any, status?: number) {
  const req = {
    query: { ...params },
  } as any;

  const res = {
    status: jest.fn(),
    send: jest.fn(),
  } as any;

  api(req, res);

  if (status) {
    expect(res.status).toBeCalledWith(status);
  }

  return res.send.mock.calls[0][0];
}

it("Missing parameters", () => {
  expect(testAPI({}, 400)).toBe("str not given");
  expect(testAPI({ str: "x" }, 400)).toBe("action not given");
});

it("Call uppercase", () => {
  expect(testAPI({ str: "a", action: "uppercase" })).toBe("A");
});

it("Call cow", () => {
  expect(testAPI({ str: "a", action: "cow" })).toEqual(cow("a"));
});

it("Call unknown action", () => {
  expect(testAPI({ str: "x", action: "??" }, 400)).toBe("Unknown action '??'");
});
