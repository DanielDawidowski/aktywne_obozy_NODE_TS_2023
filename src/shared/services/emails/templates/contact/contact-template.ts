import { IContactTemplate } from "@root/features/email/interface/email.interface";

class ContactAdminTemplate {
  public sendMessageToAdmin(templateParams: IContactTemplate): string {
    const { senderName, email, message } = templateParams;
    const imageUrl = "https://i.ibb.co/S617hrN/Logo.jpg";

    return `
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f7f7f7">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f7f7f7">
              <tbody>
                <tr>
                  <td class="m_8415581259083956697header" style="padding: 12px 0 0" align="center">
                    <table width="620" border="0" cellspacing="0" cellpadding="0" class="m_8415581259083956697mobile-shell">
                      <tbody>
                        <tr>
                          <td
                            class="m_8415581259083956697td"
                            style="width: 620px; min-width: 620px; font-size: 0; line-height: 0; font-weight: normal; margin: 0; padding: 0"
                          >
                            <table
                              class="m_8415581259083956697header"
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="#f7f7f7"
                            >
                              <tbody>
                                <tr>
                                  <td class="m_8415581259083956697header-inner" style="padding: 40px 15px; height: 300px; width: 220px">
                                    <div style="font-size: 0; line-height: 0" align="center">
                                      <a href="" style="text-decoration: none; color: inherit" target="_blank" data-saferedirecturl="">
                                        <img
                                          src=${imageUrl}
                                          border="0"
                                          width="220"
                                          height="300"
                                          alt=""
                                          class="CToWUd"
                                          style="object-fit: cover"
                                        />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td align="center">
                    <table width="620" border="0" cellspacing="0" cellpadding="0" class="m_8415581259083956697mobile-shell">
                      <tbody>
                        <tr>
                          <td
                            class="m_8415581259083956697td"
                            style="width: 620px; min-width: 620px; font-size: 0; line-height: 0; font-weight: normal; margin: 0; padding: 0"
                          >
                            <table
                              class="m_8415581259083956697main-table"
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="#ffffff"
                              style="border-radius: 10px"
                            >
                              <tbody>
                                <tr>
                                  <td style="padding: 0">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tbody>
                                        <tr>
                                          <td class="m_8415581259083956697content m_8415581259083956697content-top" style="padding: 40px 46px">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tbody>
                                                <tr>
                                                  <td style="padding-bottom: 10px">
                                                    <div
                                                      style="
                                                        color: #333333;
                                                        font-family: 'Open Sans', sans-serif;
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: bold;
                                                      "
                                                      class="m_8415581259083956697text"
                                                      align="left"
                                                    >
                                                       ${senderName}  wysłał do Ciebie wiadomość,
                                                    </div>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td style="padding-bottom: 10px">
                                                    <div
                                                      style="
                                                        color: #333333;
                                                        font-family: 'Open Sans', sans-serif;
                                                        font-size: 16px;
                                                        line-height: 26px;
                                                        font-weight: bold;
                                                      "
                                                      class="m_8415581259083956697text"
                                                      align="left"

                                                      email: ${email},
                                                    </div>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <div
                                                      class="m_8415581259083956697h1-mobile-medium"
                                                      style="
                                                        color: #50b5ff;
                                                        font-family: 'Open Sans', sans-serif;
                                                        font-size: 24px;
                                                        line-height: 30px;
                                                        letter-spacing: 0;
                                                        font-weight: 600;
                                                      "
                                                      align="left"
                                                    >
                                                      wiadomość: ${message}
                                                    </div>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    height="32"
                                                    style="font-size: 0; line-height: 0; width: 100%; min-width: 100%"
                                                    align="center"
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

  `;
  }
}

export const contactAdminTemplate: ContactAdminTemplate = new ContactAdminTemplate();
