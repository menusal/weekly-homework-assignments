import { createContext, Dispatch, ReactNode, useReducer } from 'react'

export enum ActionType {
  SET_TASKS = 'SET_TASKS',
}

type App = {
  tasks: any
}

type Action = {
  type: ActionType
  payload?: any
}

const DEFAULT_VALUE: App = {
  tasks: [],
}

export const AppContext = createContext<
  [state: App, dispatch: Dispatch<Action>]
>([DEFAULT_VALUE, () => null])

function stateReducer(state: App, { type, payload }: Action): App {
  const actions = {
    [ActionType.SET_TASKS]: () => {
      state.tasks = payload
    },
  }

  actions[type]?.()

  return {
    ...state,
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, DEFAULT_VALUE)
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}