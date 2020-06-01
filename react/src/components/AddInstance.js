import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {useFakeCloudService, fakeCloudService} from '../utils/useApi.js'
import {UserContext} from '../context/UserContext'

const AddInstance = ({setAddNewInstance}) => {
  const [newInstance, setNewInstance] = useState({})
  const {
    data: dataFlavours,
    isLoading: isLoadingFlavours
  } = useFakeCloudService('flavours')
  const {user} = useContext(UserContext)
  const submit = async (evt) => {
    evt.preventDefault()
    const payload = {...newInstance, user: user._id}
    setAddNewInstance(payload)
    await fakeCloudService.post('instances', payload)
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
            >
              <option key={'selecta'}>{'-'}</option>
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
