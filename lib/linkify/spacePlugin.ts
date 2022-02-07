import { LinkifyCoreType } from 'react-easy-linkify/dist/Core'
import { BasePlugin } from 'react-easy-linkify/dist/plugins/Base'
import { IBaseState } from 'react-easy-linkify/dist/overrite/scanner'

// based on https://github.com/smilecc/react-easy-linkify/blob/main/src/plugins/Hashtag.ts

export interface SpacePluginInit {
  S_SPACE: IBaseState
  S_SPACETAG: IBaseState
}

export class SpacePlugin extends BasePlugin<SpacePluginInit> {
  init(linkify: LinkifyCoreType) {
    const TT = linkify.scanner.TOKENS // Text tokens
    const S_START = linkify.parser.start

    return {
      S_SPACE: S_START.jump(TT.SLASH),
      S_SPACETAG: new linkify.parser.State(this.StateStorage),
    }
  }

  startEnable(linkify: LinkifyCoreType, inited: SpacePluginInit): void {
    const TT = linkify.scanner.TOKENS // Text tokens
    const MultiToken = linkify.parser.TOKENS.Base

    linkify.inherits(MultiToken, this.StateStorage, {
      type: 'space',
      isLink: true,
    })

    const { S_SPACE, S_SPACETAG } = inited

    S_SPACE.on(TT.DOMAIN, S_SPACETAG)
    S_SPACE.on(TT.TLD, S_SPACETAG)
    S_SPACE.on(TT.LOCALHOST, S_SPACETAG)
    S_SPACE.on(TT.NUM, S_SPACETAG)
  }
}

const spacesPlugin = new SpacePlugin()
export default spacesPlugin
