import { Request, Response } from "express";

export default function (req: Request, res: Response) {
  res.send(`
  <html>
    <body>
      <style>
        h1 {
          color: red;
        }
      </style>
      <h1>Upper case</h1>
      <input id="input"/>
      <button onclick="onSubmit()">Proceed</button>
      <div id="output"></div>
      <script>

      const input = document.querySelector('#input')
      const output = document.querySelector('#output')

      function onSubmit() {
        fetch("/api?number=" + input.value || "").then(res => {
          res.text().then(text => {
            output.innerHTML = text
          })
        });
      }

    </script>
    </body>
  </html>
  `);
}
