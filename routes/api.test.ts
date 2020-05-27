import api, { uppercase, asciiart } from "./api";
import { Request, Response } from "express";

it("uppercase", () => {
  expect(uppercase("A")).toBe("A");
  expect(uppercase("a")).toBe("A");
});

it("asciiart", () => {
  expect(asciiart("A")).toMatchSnapshot();
});

const request = { query: {} } as Request;
const response = ({
  status: jest.fn(),
  send: jest.fn(),
} as any) as Response;

function testHandler(query: any, status?: number) {
  jest.resetAllMocks();
  request.query = query;
  api(request, response);
  if (status) {
    expect(response.status).toBeCalledWith(status);
  }

  // @ts-ignore
  return response.send.mock.calls[0][0] as any;
}

it("Missing parameters", () => {
  expect(testHandler({}, 400)).toBe("str not given");
  expect(testHandler({ str: "x" }, 400)).toBe("format not given");
  expect(testHandler({ str: "x", format: "string" }, 400)).toBe(
    "action not given"
  );
  expect(testHandler({ str: "x", action: "ascii" }, 400)).toBe(
    "format not given"
  );
});

it.only("Uppercase", () => {
  expect(testHandler({ str: "a", action: "uppercase", format: "string" })).toBe(
    "A"
  );
});

it.only("Ascii", () => {
  expect(
    testHandler({ str: "a", action: "asciiart", format: "string" })
  ).toBeDefined();
});
