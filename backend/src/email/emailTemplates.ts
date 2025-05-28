function OrderEmailBody() {
  return `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#FFFFFF;color:#333333;font-family:Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF;border-radius:12px;border:1px solid #f0f0f0"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="padding:16px 24px 24px 24px">
                <table
                  align="center"
                  width="100%"
                  cellpadding="0"
                  border="0"
                  style="table-layout:fixed;border-collapse:collapse"
                >
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      >
                        <div style="padding:16px 24px 16px 24px">
                          <img
                            alt="LOGO"
                            src="BRAND_IMAGE"
                            style="outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                          />
                        </div>
                      </td>
                      <td
                        style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0"
                      >
                        <div style="padding:0px 0px 0px 0px">
                          <div
                            style="color:#808080;font-size:14px;font-weight:normal;text-align:right;padding:0px 0px 0px 0px"
                          >
                            ČÍSLO OBJEDNÁVKY
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:16px 24px 0px 24px"
              >
                Děkujeme za vaši objednávku
              </h3>
              <div
                style="color:#404040;font-size:16px;font-weight:normal;text-align:left;padding:16px 24px 16px 24px"
              >
                V tuto chvíli začínáme připravovat techniku.
              </div>
              <div style="text-align:left;padding:16px 24px 40px 24px">
                <a
                  href="URL"
                  style="color:#FFFFFF;font-size:16px;font-weight:normal;background-color:#6ba34d;border-radius:4px;display:inline-block;padding:16px 32px;text-decoration:none"
                  target="_blank"
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 32px;mso-font-width:-100%;mso-text-raise:48"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ><span>Vaše objednávka</span
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 32px;mso-font-width:-100%"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ></a
                >
              </div>
              <div style="padding:16px 0px 16px 0px">
                <hr
                  style="width:100%;border:none;border-top:1px solid #EEEEEE;margin:0"
                />
              </div>
              <div
                style="font-size:14px;font-weight:normal;text-align:left;padding:16px 24px 16px 24px"
              >
                Pokud máte nějaké otázky, můžete nám odepsat na tento email.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
}
