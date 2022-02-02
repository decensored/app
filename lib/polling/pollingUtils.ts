import type { PostType, SpaceType } from 'lib/types'

export const pollingConfig = {
  batchSize: 1000000, // load max this many in parallel from the smartcontract
  highWater: 1250, // when we have at least this...
  lowWater: 1000, // ..reduce to this amount
}

export const limitArray = (array: PostType[] | SpaceType[], set: (value: any) => void, name = ''): void => {
  // console.log(`limitArray ${name} ${array.length}`)

  if (array.length < pollingConfig.highWater) return // early exit

  console.log(
    `limitArray ${name} length ${array.length} >= ${pollingConfig.highWater}. Reduce to ${pollingConfig.lowWater}`
  )

  const newArray = array.slice(0, pollingConfig.lowWater)
  set(newArray)
} // end of limitArray
