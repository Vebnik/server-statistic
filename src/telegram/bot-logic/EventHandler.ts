import {Context} from "telegraf";
import {Message, Update} from "typegram";

class MatchedContext<T, U> {
}

class EventHandler {

	public messageEvent(context: Context<Update>) {
		//console.log(context.message)
	}

	public commandEvent(context: MatchedContext<Context<Update>, "text">) {
		//console.log(context)
	}
}

export default new EventHandler()