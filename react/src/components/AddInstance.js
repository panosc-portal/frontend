import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import Api from '../utils/api'
import {useFetch} from '../utils'
import {UserContext} from '../context/UserContext'
import useFreshInstances from './instanceDndHelper.js'

const AddInstance = () => {
  const [newInstance, setNewInstance] = useState({})
  const {data: dataFlavours, isLoading: isLoadingFlavours} = useFetch(
    'flavours'
  )
  const {setNewInstance: setAddNewInstance} = useFreshInstances()
  const {user} = useContext(UserContext)
  const submit = async (evt) => {
    evt.preventDefault()
    const payload = {...newInstance, user: user._id}
    await Api.post('/instances', {...payload})
    setAddNewInstance({...payload})
  }
  return (
    <>
      {isLoadingFlavours ? (
        <>Loading</>
      ) : (
        <div>
          <b>Create environment</b>
          <Form onSubmit={submit}>
            <label>Name:</label>
            <input
              type="text"
              onChange={(e) =>
                setNewInstance({...newInstance, name: e.target.value})
              }
            />
            <br />
            <select
              onChange={(e) =>
                setNewInstance({...newInstance, flavour: e.target.value})
              }
              selected={dataFlavours[0]._id}
            >
              {dataFlavours.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name}
                </option>
              ))}
            </select>
            <input type="submit" value="Submit" />
          </Form>
        </div>
      )}
    </>
  )
}

export default AddInstance

const Form = styled.form``
