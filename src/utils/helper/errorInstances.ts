export class OperationalError extends Error {
   public statusCode: number;
   public message: string;
   public status: string;
 
   constructor(statusCode: number = 500, message: string = "Server error") {
     super(message);
 
     //  This is a fix for incorrect instanceOf
     Object.setPrototypeOf(this, OperationalError.prototype);
     Error.captureStackTrace(this, this.constructor);
 
     this.statusCode = statusCode;
     this.message = message;
     this.status = statusCode >= 400 && statusCode < 500 ? "Failed" : "Error";
   }
 }
 
 export class RouteNotFound extends Error {
   public statusCode: number = 404;
   public message: string;
   public status: string;
 
   constructor(message: string) {
     super(message);
 
     //  This is a fix for incorrect instanceOf
     Object.setPrototypeOf(this, RouteNotFound.prototype);
     Error.captureStackTrace(this, this.constructor);
 
     this.status = this.status;
     this.name = this.constructor.name;
     this.message = message;
   }
 }
 
 export class ActionFailedError extends Error {
   public statusCode: number = 400;
 
   constructor(statusCode: number, message: string = "something went wrong") {
     super(message);
 
     //  This is a fix for incorrect instanceOf
     Object.setPrototypeOf(this, ActionFailedError.prototype);
     Error.captureStackTrace(this, this.constructor);
 
     this.statusCode = statusCode;
     this.message = message;
   }
 }
 
 export class ValidationFailed extends Error {
   public statusCode: number;
 
   constructor(
     statusCode: number = 400,
     message: string = "Validation Failed, Kindly check your parameters"
   ) {
     super(message);
 
     Object.setPrototypeOf(this, ValidationFailed.prototype);
     Error.captureStackTrace(this, this.constructor);
 
     this.message = this.message;
     this.statusCode = statusCode;
     this.name = this.constructor.name;
   }
 }
 