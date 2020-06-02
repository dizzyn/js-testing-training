import api, { uppercase, cow } from "./api";
import { Request, Response } from "express";
import page, { pagePath } from "./page";
import * as fs from "fs";

it("Page file exists", () => {
  const response = {
    sendFile: jest.fn(),
  } as any;

  page({} as any, response);
  expect(response.sendFile).toBeCalledWith(pagePath);
  expect(fs.readFileSync(pagePath, "utf-8")).toBeDefined();
});
