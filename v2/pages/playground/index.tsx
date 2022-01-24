import type { NextPage } from 'next'
import React from 'react'
import Gun from 'gun'

const gun = Gun()

// TODO: Add gun.eco (GunJS) related experiments

const Playground: NextPage = () => {
  // console.log(gun)
  const items = gun.get('items')
  // console.log(items)

  return <>{JSON.stringify(items, null, 2)}</>
}

export default Playground
