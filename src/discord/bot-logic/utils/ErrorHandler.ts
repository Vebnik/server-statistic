import {DiscordAPIError} from "@discordjs/rest";


class ErrorHandler {

	public startError(err: DiscordAPIError) {
		console.error(err.rawError)
	}

	public interactionError(err: any) {
		console.log(err)
	}
}

export default new ErrorHandler()