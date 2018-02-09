import { request, config } from 'utils'

const { api } = config
const { adminUser } = api

export async function query (params) {
  return request({
    url: adminUser,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: adminUser.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: adminUser,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: adminUser,
    method: 'patch',
    data: params,
  })
}
