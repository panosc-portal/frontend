import React, {useState} from 'react'

export const TabContext = React.createContext()

const TabProvider = (props) => {
  const initTabs = []
  localStorage.getItem('tabs') !== null &&
    initTabs.push(...JSON.parse(localStorage.getItem('tabs')))

  const [tabs, setTabs] = useState([...initTabs])
  const openTab = (tab) => {
    const tabIds = tabs.map((i) => i._id).reduce((acc, item) => [...acc, item], [])
    !tabIds.includes(tab.id) &&
      (setTabs([...tabs, tab]) ||
        localStorage.setItem('tabs', JSON.stringify([...tabs, tab])))
  }
  const closeTab = (tab) => {
    const updateTabs = tabs.filter((item) => item !== tab)
    setTabs(updateTabs)
    localStorage.setItem('tabs', JSON.stringify(updateTabs))
  }
  return (
    <TabContext.Provider value={{tabs, setTabs, openTab, closeTab}}>
      {props.children}
    </TabContext.Provider>
  )
}

export default TabProvider
