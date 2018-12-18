import elasticsearchService from 'services/elasticsearch'
import config from 'infrastructure/config'
import mapping from 'mapping/file'

const FILE_VERSION = config.elasticsearch.fileVersion
const TYPE_NAME = `${ FILE_VERSION }-media`

const list = async (projectIdentifier, params) => {
  const { pattern, preset } = params

  if (!projectIdentifier) {
    return null
  }

  if (preset) {
    return await elasticsearchService.searchByPresetHash(`${ FILE_VERSION }-${ projectIdentifier }`, TYPE_NAME, preset)
  }

  if (pattern) {
    return await elasticsearchService.searchByPattern(`${ FILE_VERSION }-${ projectIdentifier }`, TYPE_NAME, pattern)
  }

  return await elasticsearchService.searchByProject(`${ FILE_VERSION }-${ projectIdentifier }`, TYPE_NAME)
}

const get = async (projectIdentifier, fileIdentifier) => {
  if (!projectIdentifier || !fileIdentifier) {
    return null
  }

  return await elasticsearchService.get(
    `${ FILE_VERSION }-${ projectIdentifier }`,
    TYPE_NAME,
    fileIdentifier
  )
}

const create = async (projectIdentifier, fileIdentifier, params) => {
  if (!projectIdentifier || !fileIdentifier) {
    return null
  }

  return await elasticsearchService.create(
    `${ FILE_VERSION }-${ projectIdentifier }`,
    TYPE_NAME,
    fileIdentifier,
    mapping,
    params
  )
}

const replace = async (projectIdentifier, fileIdentifier, params) => {
  if (!projectIdentifier || !fileIdentifier) {
    return null
  }

  return await elasticsearchService.replace(
    `${ FILE_VERSION }-${ projectIdentifier }`,
    TYPE_NAME,
    fileIdentifier,
    params
  )
}

const remove = async (projectIdentifier, fileIdentifier) => {
  if (!projectIdentifier || !fileIdentifier) {
    return null
  }

  return await elasticsearchService.remove(
    `${ FILE_VERSION }-${ projectIdentifier }`,
    TYPE_NAME,
    fileIdentifier
  )
}

const head = async (projectIdentifier, fileIdentifier) => {
  if (!projectIdentifier || !fileIdentifier) {
    return null
  }

  return await elasticsearchService.head(
    `${ FILE_VERSION }-${ projectIdentifier }`,
    TYPE_NAME,
    fileIdentifier
  )
}

export default {
  create,
  get,
  head,
  list,
  remove,
  replace
}
