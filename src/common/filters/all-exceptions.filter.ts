import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const isHttpException = exception instanceof HttpException;
    const status: number = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultMessage = 'Internal Server Error';
    const defaultError = 'Internal Server Error';

    let messages: string[] = [defaultMessage];
    let errorName = defaultError;

    if (isHttpException) {
      const responseData = exception.getResponse();

      if (typeof responseData === 'string') {
        messages = [responseData];
      } else if (typeof responseData === 'object' && responseData !== null) {
        const { message, error } = responseData as Record<string, any>;

        if (Array.isArray(message)) {
          messages = message;
        } else if (typeof message === 'string') {
          messages = [message];
        }

        if (typeof error === 'string') {
          errorName = error;
        }
      }
    } else {
      console.error('Unexpected error:', exception);
    }

    return response.status(status).json({
      message: messages,
      error: errorName,
      statusCode: status,
    });
  }
}
