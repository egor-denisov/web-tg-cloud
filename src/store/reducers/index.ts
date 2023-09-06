import { combineReducers } from 'redux'
import { ContentReducer } from './contentReducer'
import { UserReducer } from './userReducer'
export const rootReducer = combineReducers({
	content: ContentReducer,
	user: UserReducer
})

export type RootState = ReturnType<typeof rootReducer>
