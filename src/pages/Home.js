import React, { useCallback, useState } from 'react'
import { useKeycloak } from '@react-keycloak/web'

import { useAxios } from '../utils/hooks'

const isUser = (keycloak) => {
  return keycloak.hasResourceRole("user", "w3gig-labs")
}

const isAdmin = (keycloak) => {
  return keycloak.hasResourceRole("admin", "w3gig-labs")
}

const isUserOrAdmin = (keycloak) => {
  return keycloak.hasResourceRole("user", "w3gig-labs") || keycloak.hasResourceRole("admin", "w3gig-labs")
}

export default () => {

  const [response, setResponse] = useState()
  const { keycloak } = useKeycloak()
  const axiosInstance = useAxios('http://localhost:8081')

  const callUserApi = useCallback(() => {
    axiosInstance.get('/api/v1/user').then((response) => {
      console.log(response.data);
      setResponse(response.data);
    }, (error) => {
      console.log(error);
    });
  }, [axiosInstance])

  const callAdminApi = useCallback(() => {
    axiosInstance.get('/api/v1/admin').then((response) => {
      console.log(response.data);
      setResponse(response.data);
    }, (error) => {
      console.log(error);
    });
  }, [axiosInstance])

  const callUserOrAdminApi = useCallback(() => {
    axiosInstance.get('/api/v1/all-user').then((response) => {
      console.log(response.data);
      setResponse(response.data);
    }, (error) => {
      console.log(error);
    });
  }, [axiosInstance])

  return (
    <div>
      <div>User is {!keycloak.authenticated ? 'NOT ' : ''} authenticated</div>
      <div>&nbsp;</div>
      <div>Response: {response}</div>

      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}

      {isUser(keycloak) &&
        <button type="button" onClick={callUserApi}>
          Call User API
        </button>
      }

      {isAdmin(keycloak) &&
        <button type="button" onClick={callAdminApi}>
          Call Admin API
        </button>
      }

      {isUserOrAdmin(keycloak) &&
        <button type="button" onClick={callUserOrAdminApi}>
          Call User or Admin API
        </button>
      }
    </div>
  )
}
