/* Error Builder */
class HttpError {
  statusCode: number;
  errMessage: string;

  constructor(statusCode: number, errMessage: string) {
    this.statusCode = statusCode;
    this.errMessage = errMessage;
  }
}

let GlobalVars = {
  api: "https://api.wskr.io/api/v1",
};

export { HttpError, GlobalVars };
