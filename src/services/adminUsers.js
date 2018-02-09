import { request, config } from 'utils'

const { api } = config
const { adminUsers } = api

export async function query (params) {
  return request({
    url: adminUsers,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: adminUsers,
    method: 'delete',
    data: params,
  })
}
