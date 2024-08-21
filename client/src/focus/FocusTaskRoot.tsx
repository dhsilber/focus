import { useCallback, useContext, useEffect } from "react"
// import FocusTaskList from "./FocusTaskList"
import { FocusStateContext } from "./FocusStateProvider"
import { FocusStorageContext } from "./FocusStorageProvider"

export default function FocusTaskRoot() {
    const {setTaskV2SetV2Storage} = useContext(FocusStorageContext)

    const {taskData, dispatch} = useContext(FocusStateContext)

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // event.stopPropagation()
        // event.preventDefault()
        if( event.altKey) {
            switch(event.key) {
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
                case 'Enter':
                    dispatch({type: 'edit'})
                    break
                case '+':
                    // event.preventDefault() 
                    console.log('Shift + ', event.key, ' - ', event.keyCode, ' (create-child)')
                    dispatch({type: 'create-child'})
                    break
                default:
                    console.log('Shift + ', event.key, ' - ', event.keyCode)
                    break
            }
        } else {
            switch(event.key) {
                case 's':
                    setTaskV2SetV2Storage(taskData)
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
    }, [dispatch])

    useEffect(() => {
        if( taskData.editingId != -1 ) return
        
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown])

    return <div>
              {/* <FocusTaskList key={0} id={0} indent={0}/> */}
           </div>
}