'use strict'

const agent = {
    id: 1,
    uuid: 'yyyy-yyyy-yyyy',
    name: 'fixture',
    username: 'userTest',
    hostname: 'test-host',
    pid: 1212,
    connected: true,
    createAt: new Date(),
    updateAt: new Date()
}
const agents = [
    agent,
    extend(agent, {id:2, uuid: 'hhh-hhh', name: 'userOne'}),
    extend(agent, {id:3, uuid: 'hhh-hhhd', connected: false}),
    extend(agent, {id:4, uuid: 'hhh-hhha', pid: 4444})
]

function extend (obj, values) {
    const clone = Object.assign({}, obj)
    return Object.assign(clone, values)
}
module.exports = {
    single: agent,
    all: agents,
    connected: agents.filter(a => a.connected = true),
    userOne: agents.filter(a => a.username === 'userOne'),
    byUuid: id => agents.filter(a => a.uuid === id).shift(),
    byId: id => agents.filter(a => a.id === id).shift(),
}