// import chalk from 'chalk';

function Log(error: string, errorType = 'default') {
//     const loggerType = [
//         'log',
//         'info',
//         'warning',
//         'error'
//     ]
//     const logger = {
//         'log': (error: any) => console.log(error),
//         'info': (error: any) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof error === 'string' ? chalk.blueBright(error) : error),
//         'warning': (error: any) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof error === 'string' ? chalk.yellowBright(error) : error),
//         'error': (error: any) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof error === 'string' ? chalk.redBright(error) : args)
//     }
//     logger[errorType as loggerType];
  console.log(errorType, '=>', error);
}

export default {
  Log,
};
