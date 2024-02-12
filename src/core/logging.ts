import * as winston from 'winston';
const { combine, timestamp, colorize, printf } = winston.format;

let logger: winston.Logger;

type FormatMessageProps = {
  level: string;
  message: string;
  timestamp: Date;
  name: string;
};

type FormatProps = FormatMessageProps & {
  error?: {
    stack: string
  },
}

const loggerFormat = () => {
  const formatMessage = ({
    level,
    message,
    timestamp,
    name = 'server',
    ...rest
  }: FormatMessageProps) =>
    `${timestamp} | ${name} | ${level} | ${message} | ${JSON.stringify(rest)}`;

  const formatError = ({ error: { stack }, ...rest }: FormatProps) =>
    `${formatMessage(rest)}\n\n${stack}\n`;

  const format = (info: FormatProps) =>
    info.error instanceof Error ? formatError(info) : formatMessage(info);

  return combine(colorize(), timestamp(), printf(format));
};

const getLogger = () => {
  if (!logger) throw new Error('You must first initialize the logger');
  return logger;
};

type InitializeLoggerProps = {
  level: string;
  disabled: boolean;
  defaultMeta?: object;
  extraTransports?: Array<winston.transports.ConsoleTransportInstance>;
};

const initializeLogger = ({
  level,
  disabled,
  defaultMeta = {},
  extraTransports = [],
}: InitializeLoggerProps) => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: loggerFormat(),
    transports: [
      new winston.transports.Console({ silent: disabled }),
      ...extraTransports,
    ],
  });

  logger.info(`Logger initialized with minimum log level ${level}`);
};

export { initializeLogger, getLogger };