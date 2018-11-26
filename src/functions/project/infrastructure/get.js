import { NOT_FOUND, OK } from 'http-status-codes'

import resource from 'rest/resource'
import infrastructureService from 'services/infrastructure'

export default resource('INFRASTRUCTURE')(
  async (req) => {
    const { projectIdentifier } = req.pathParameters

    const infrastructure = await infrastructureService.get(projectIdentifier)

    if (!infrastructure) {
      throw {
        statusCode: NOT_FOUND
      }
    }

    return {
      statusCode: OK,
      resource: infrastructure
    }
  }
)
