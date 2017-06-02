import { stdout, stderr } from "process";
import { LogLevel } from "../enums/log-levels";

export class Logger {

	constructor () {

	}

	private static log ( message: string, type: LogLevel ): void {
		if ( type === LogLevel.Error ) {
			stderr.write( message );
		} else {
			stdout.write( message );
		}
	};

	public static info = ( message: string ): void => {
		Logger.log( message, LogLevel.Info );
	};

	public static warn = ( message: string ): void => {
		Logger.log( message, LogLevel.Warn );
	};

	public static error = ( message: string ): void => {
		Logger.log( message, LogLevel.Error );
	};

	public static success = ( message: string ): void => {
		Logger.log( message, LogLevel.Success );
	};
}