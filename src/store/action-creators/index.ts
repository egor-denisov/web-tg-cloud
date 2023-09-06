import * as ContentActionCreators from './content'
import * as UserActionCreators from './user'

export default {
	...ContentActionCreators,
	...UserActionCreators
}
