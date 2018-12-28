import { OK } from 'http-status-codes'
import joi from 'joi'

import resource from 'rest/resource'
import jobService from 'services/job'

const SCHEMA = joi.object().keys({
  maxJobs: joi.number().min(0).required()
})

export default resource('JOB_SNAPSHOT')(
  async (req) => {
    const body = JSON.parse(req.body) || {}
    const values = await joi.validate(body, SCHEMA)

    const hits = await jobService.snapshot(values)

    return {
      statusCode: OK,
      resource: hits
    }
  }
)
