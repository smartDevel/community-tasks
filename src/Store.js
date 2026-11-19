import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

const throwIfError = ({ error }) => {
  if (error) throw error
}

export const useStore = ({ uuid }) => {
  const [list, setList] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    let active = true

    fetchList(uuid)
      .then((data) => {
        if (!active) return
        setList(data)
        setTasks([...data.tasks].sort((a, b) => b.id - a.id))
      })
      .catch(console.error)

    return () => {
      active = false
    }
  }, [uuid])

  useEffect(() => {
    if (!list) return undefined

    const applyTask = (task) => {
      setTasks((current) => {
        const existing = current.some(({ id }) => id === task.id)
        if (existing) {
          return current.map((item) => (item.id === task.id ? task : item))
        }
        return [task, ...current]
      })
    }

    const channel = supabase
      .channel(`tasks-list-${list.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tasks', filter: `list_id=eq.${list.id}` },
        ({ new: task }) => applyTask(task)
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tasks', filter: `list_id=eq.${list.id}` },
        ({ new: task }) => applyTask(task)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [list])

  return { list, tasks, setTasks }
}

export const addTask = async (task_text, list_id) => {
  const result = await supabase.from('tasks').insert([{ task_text, list_id }]).select().single()
  throwIfError(result)
  return result.data
}

export const updateTask = async (task_id, values) => {
  const result = await supabase.from('tasks').update(values).eq('id', task_id).select().single()
  throwIfError(result)
  return result.data
}

export const createList = async (uuid) => {
  const result = await supabase.from('lists').insert([{ uuid }]).select().single()
  throwIfError(result)
  return result.data
}

export const fetchList = async (list_uuid) => {
  const result = await supabase.from('lists').select('*, tasks(*)').eq('uuid', list_uuid).single()
  throwIfError(result)
  return result.data
}
