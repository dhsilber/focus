import { useCallback, useContext, useEffect } from "react"
import FocusTaskList from "./FocusTaskList"
import { FocusStateContext } from "./FocusStateProvider"

export default function FocusTaskRoot() {

    const {taskData, dispatch} = useContext(FocusStateContext)

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        event.stopPropagation()
        if( event.altKey) {
            switch(event.key) {
                // case '∆': // alt-j
                //     dispatch({type: 'down'})
                //     break
                // case '˚': // alt-k
                //     dispatch({type: 'up'})
                //     break
                //     // case '¬': // alt-l - TODO change to alt-shift-L
                //     //     handleIndentRight()
                //     //     break
                // case 'Ô': // alt-shift-J
                //     dispatch({type: 'move-down'})
                //     break
                // // case '': // alt-shift-K
                // //     handleMoveUp()
                // //     break
                // case '≠': // alt-=
                //     console.log('key: alt+ ', event.key, ' - ', event.keyCode)
                //     dispatch ({
                //         type: 'create-task'
                //     })
                //     break
                default:
                    console.log('key: alt+', event.key, ' - ', event.keyCode)
                    break
            }
        } else {
            switch(event.key) {
                case 'ArrowUp':
                    console.log("Up!") 
                    dispatch({type: 'up'})
                    break
                case 'ArrowDown':
                    console.log("Down!") 
                    dispatch({type: 'down'})
                    break
                default:
                    console.log('key: ', event.key, ' - ', event.keyCode)
                    break
            }
        }  
        event.stopPropagation()      
    }, [dispatch])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)

        return () => {
        document.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown])

    return  <FocusTaskList key={0} id={0} />
}