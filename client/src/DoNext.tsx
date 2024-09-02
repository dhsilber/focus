import { useEffect, useState } from 'react'
import './DoNext.css'
import RepeatingDos from './todo/RepeatingDos'
import useLocalStorageState from 'use-local-storage-state'
import Events from './event/Events'
import { defaultToDoData } from './storage/Storage'
import Storage from './storage/Storage'
import { TodoV4StorageKey } from './Constants'
import Projects from './project/Projects'
import Tracks from './track/Tracks'
import Tasks from './task/Tasks'
import Analyze from './analyze/Analyze'
import { MinuteMilliseconds } from './DateUtilities'

function DoNext() {
  const [, setStateToForceRerender] = useState(new Date())
  const [todoStorage] = useLocalStorageState(TodoV4StorageKey, {
    defaultValue: defaultToDoData
  })

  useEffect(() => {
    setInterval(() => {
      setStateToForceRerender(new Date())
    }, MinuteMilliseconds)
  }, [])

  return <>
    <div className="App">
      <Analyze />
      <Tasks />
      <Tracks />
      <Events />
      <RepeatingDos data={todoStorage.todos} />
      <Storage />
      <Projects />
    </div>
  </>
}

export default DoNext
