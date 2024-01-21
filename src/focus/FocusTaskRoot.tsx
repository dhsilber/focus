import { useCallback, useContext, useEffect } from "react"
import FocusTaskList from "./FocusTaskList"
import { FocusStateContext } from "./FocusStateProvider"
import { FocusStorageContext } from "./FocusStorageProvider"

export default function FocusTaskRoot() {
    const {saveTaskV2Data} = useContext(FocusStorageContext)

    const {dispatch} = useContext(FocusStateContext)

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
                //     dispatch ({
                //         type: 'create-task'
                //     })
                //     break
                default:
                    console.log('Alt + ', event.key, ' - ', event.keyCode)
                    break
            }
        } else if (event.shiftKey) {
            switch(event.key) {
                case 'ArrowUp':
                    dispatch({type: 'move-up'})
                    break
                case 'ArrowDown':
                    dispatch({type: 'move-down'})
                    break
                case 'ArrowRight':
                    dispatch({type: 'indent'})
                    break
                case 'ArrowLeft':
                    dispatch({type: 'outdent'})
                    break
                default:
                    console.log('Shift + ', event.key, ' - ', event.keyCode)
                    break
            }
        } else {
            switch(event.key) {
                case 's':
                    saveTaskV2Data()
                    break
                case 'ArrowUp':
                    dispatch({type: 'up'})
                    break
                case 'ArrowDown':
                    dispatch({type: 'down'})
                    break
                case 'ArrowRight':
                    dispatch({type: 'in-to-child'})
                    break
                case 'ArrowLeft':
                    dispatch({type: 'out-to-parent'})
                    break
                default:
                    console.log(event.key, ' - ', event.keyCode)
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

    return  <FocusTaskList key={0} id={0} indent={0}/>
}