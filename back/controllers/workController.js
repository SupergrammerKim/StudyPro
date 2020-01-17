import {works, users, studies} from "../models"

export const create_work = async function(req, res) {
    const data = req.body

    const user = await users.findOne({where:{id:data.writer}})
    const study = await studies.findOne({where:{id:data.study_id}})
    const wrong_id = !user || !study

    const same_content_at_date = await works.findOne({where:{start_date:data.start_date, content:data.content}})
    const same_work = !same_content_at_date
    
    const result = await works.create_work(data, wrong_id, !same_work)
    res.send(result)
}

export const delete_work = async function(req, res) {
    const work_id = req.params.work_id
    const result = await works.delete_work(work_id)

    res.send(result)
}

export const update_work = async function(req, res) {
    const work_id = req.params.work_id
    const data = req.body

    const result = await works.update_work(work_id, data)
    res.send(result)
}

export const read_works = async function(req, res) {
    const study_id = req.body.study_id

    const result = await works.read_works_by_study(study_id)
    res.send(result)
}